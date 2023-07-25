/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("IndieRacersWE", function ($asm, globals) {
    "use strict";

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @param   {string}    arg
     * @return  {void}
     */

    Bridge.define("net.sylde.BridgeNet.Aide", {
        statics: {
            methods: {
                /**
                 * IOException
                 *
                 * @static
                 * @public
                 * @this net.sylde.BridgeNet.Aide
                 * @memberof net.sylde.BridgeNet.Aide
                 * @param   {string}                           ùUrl_s
                 * @return  {System.Threading.Tasks.Task$1}
                 */
                csHttpGetStringAsync_s: function (ùUrl_s) {
                    var ùRet_tcs = new System.Threading.Tasks.TaskCompletionSource();

                    var ùRequete_xhr = new XMLHttpRequest();
                    ùRequete_xhr.onreadystatechange = function () {
                        if (ùRequete_xhr.readyState === 4) {
                            if (ùRequete_xhr.status !== 200) {
                                throw new System.IO.IOException.ctor();
                            }

                            ùRet_tcs.trySetResult(ùRequete_xhr.responseText);
                        }
                    };

                    ùRequete_xhr.open("GET", ùUrl_s, true);
                    ùRequete_xhr.send();

                    return ùRet_tcs.task;
                },
                /**
                 * IOException
                 *
                 * @static
                 * @public
                 * @this net.sylde.BridgeNet.Aide
                 * @memberof net.sylde.BridgeNet.Aide
                 * @param   {string}           ùUrl_s           
                 * @param   {System.Action}    ùOnResultat_a
                 * @return  {void}
                 */
                tsHttpGetStringStart_s: function (ùUrl_s, ùOnResultat_a) {
                    var ùRequete_xhr = new XMLHttpRequest();
                    ùRequete_xhr.onreadystatechange = function () {
                        if (ùRequete_xhr.readyState === 4) {
                            if (ùRequete_xhr.status !== 200) {
                                ùOnResultat_a(null);
                            }

                            ùOnResultat_a(ùRequete_xhr.responseText);
                        }
                    };

                    ùRequete_xhr.open("GET", ùUrl_s, true);
                    ùRequete_xhr.send();
                }
            }
        }
    });

    Bridge.define("net.sylde.BridgeNet.EvenementTask", {
        inherits: [System.Threading.Tasks.TaskCompletionSource],
        fields: {
            cFire_a: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Threading.Tasks.TaskCompletionSource.call(this);
                this.cFire_a = Bridge.fn.bind(this, function (ùe) {
                    this.trySetResult(false);
                });
            }
        }
    });

    Bridge.define("net.sylde.BridgeNet.EvenementTask$1", function (E) { return {
        inherits: [System.Threading.Tasks.TaskCompletionSource],
        fields: {
            cFire_a: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Threading.Tasks.TaskCompletionSource.call(this);
                this.cFire_a = Bridge.fn.bind(this, function (ùe) {
                    this.trySetResult(ùe.currentTarget);
                });
            }
        }
    }; });

    Bridge.define("net.sylde.IndieRacersWE", {
        main: function Main () {
            var $step = 0,
                $task1, 
                $taskResult1, 
                $task4, 
                $jumpFromFinally, 
                ùOnWindow_oe, 
                ùModel_t, 
                ùGamesList_sr, 
                ùGames_l, 
                ùGame_s, 
                ùGames_sb, 
                ù_r, 
                sIdx_s32, 
                ùGame_g, 
                ùModel_s, 
                ùEx, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1,2,3,4,5], $step);
                        switch ($step) {
                            case 0: {
                                ùOnWindow_oe = new net.sylde.BridgeNet.EvenementTask();
                                window.onload = ùOnWindow_oe.cFire_a;

                                ùModel_t = net.sylde.BridgeNet.Aide.csHttpGetStringAsync_s("r/games/model.txt");

                                $task1 = net.sylde.BridgeNet.Aide.csHttpGetStringAsync_s("r/games/list.txt");
                                $step = 1;
                                if ($task1.isCompleted()) {
                                    continue;
                                }
                                $task1.continue($asyncBody);
                                return;
                            }
                            case 1: {
                                $taskResult1 = $task1.getAwaitedResult();
                                ùGamesList_sr = new System.IO.StringReader($taskResult1);
                                ùGames_l = new (System.Collections.Generic.List$1(System.Threading.Tasks.Task$1(net.sylde.IndieRacersWE.Game))).ctor();
                            }
                            case 2: {
                                ùGame_s = ùGamesList_sr.ReadLine();
                                if (ùGame_s != null) {
                                    $step = 3;
                                    continue;
                                } 
                                $step = 4;
                                continue;
                            }
                            case 3: {
                                ùGames_l.add(net.sylde.IndieRacersWE.csInitGameAsync(ùGame_s));
                                $step = 2;
                                continue;
                            }
                            case 4: {
                                $task4 = System.Threading.Tasks.Task.whenAll(ùOnWindow_oe.task, ùModel_t, System.Threading.Tasks.Task.whenAll(ùGames_l));
                                $step = 5;
                                if ($task4.isCompleted()) {
                                    continue;
                                }
                                $task4.continue($asyncBody);
                                return;
                            }
                            case 5: {
                                $task4.getAwaitedResult();
                                try {
                                    ùGames_sb = new System.Text.StringBuilder();
                                    ù_r = new System.Random.ctor();
                                    while (ùGames_l.Count > 0) {
                                        sIdx_s32 = ù_r.Next$2(0, ùGames_l.Count);
                                        ùGame_g = ùGames_l.getItem(sIdx_s32).getResult();
                                        ùGames_l.removeAt(sIdx_s32);

                                        ùModel_s = ùModel_t.getResult();
                                        ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7GameFolder\u00a7", ùGame_g._Folder_s);
                                        ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7GameTitle\u00a7", ùGame_g._Title_s);
                                        ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7GameSubTitle\u00a7", ùGame_g._SubTitle_s);
                                        ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7GameDescription\u00a7", ùGame_g._Description_s);

                                        if (ùGame_g._ImgUrl_s.length > 0) {
                                            ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7imgLinkStart\u00a7", "<a target=\"blank\" href=\"" + (ùGame_g._ImgUrl_s || "") + "\">");
                                            ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7imgLinkEnd\u00a7", "</a>");
                                        } else {
                                            ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7imgLinkStart\u00a7", "");
                                            ùModel_s = System.String.replaceAll(ùModel_s, "\u00a7imgLinkEnd\u00a7", "");
                                        }

                                        ùGames_sb.append(ùModel_s);
                                    }

                                    document.body.innerHTML = System.String.replaceAll(document.body.innerHTML, "<div id=\"games\"></div>", ùGames_sb.toString());
                                } catch (ùEx) {
                                    ùEx = System.Exception.create(ùEx);
                                    document.body.innerHTML = Bridge.toString(ùEx);
                                }
                                return;
                            }
                            default: {
                                return;
                            }
                        }
                    }
                }, arguments);

            $asyncBody();
        },
        statics: {
            methods: {
                csInitGameAsync: function (sGame_s) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $task2, 
                        $taskResult2, 
                        $task3, 
                        $taskResult3, 
                        $task4, 
                        $taskResult4, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        $t, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1,2,3,4], $step);
                                    switch ($step) {
                                        case 0: {
                                            $task1 = net.sylde.BridgeNet.Aide.csHttpGetStringAsync_s("r/games/" + (sGame_s || "") + "/imgUrlOptional.txt");
                                            $step = 1;
                                            if ($task1.isCompleted()) {
                                                continue;
                                            }
                                            $task1.continue($asyncBody);
                                            return;
                                        }
                                        case 1: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            $task2 = net.sylde.BridgeNet.Aide.csHttpGetStringAsync_s("r/games/" + (sGame_s || "") + "/title.txt");
                                            $step = 2;
                                            if ($task2.isCompleted()) {
                                                continue;
                                            }
                                            $task2.continue($asyncBody);
                                            return;
                                        }
                                        case 2: {
                                            $taskResult2 = $task2.getAwaitedResult();
                                            $task3 = net.sylde.BridgeNet.Aide.csHttpGetStringAsync_s("r/games/" + (sGame_s || "") + "/subtitle.txt");
                                            $step = 3;
                                            if ($task3.isCompleted()) {
                                                continue;
                                            }
                                            $task3.continue($asyncBody);
                                            return;
                                        }
                                        case 3: {
                                            $taskResult3 = $task3.getAwaitedResult();
                                            $task4 = net.sylde.BridgeNet.Aide.csHttpGetStringAsync_s("r/games/" + (sGame_s || "") + "/description.txt");
                                            $step = 4;
                                            if ($task4.isCompleted()) {
                                                continue;
                                            }
                                            $task4.continue($asyncBody);
                                            return;
                                        }
                                        case 4: {
                                            $taskResult4 = $task4.getAwaitedResult();
                                            $tcs.setResult(($t = new net.sylde.IndieRacersWE.Game(), $t._Folder_s = sGame_s, $t._ImgUrl_s = $taskResult1, $t._Title_s = $taskResult2, $t._SubTitle_s = $taskResult3, $t._Description_s = $taskResult4, $t));
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                }
            }
        }
    });

    Bridge.define("net.sylde.IndieRacersWE.Game", {
        $kind: "nested class",
        fields: {
            _Folder_s: null,
            _ImgUrl_s: null,
            _Title_s: null,
            _SubTitle_s: null,
            _Description_s: null
        }
    });

    /** @namespace System.Reflection */

    /**
     * Instructs obfuscation tools to use their standard obfuscation rules for the appropriate assembly type.
     *
     * @class System.Reflection.ObfuscateAssemblyAttribute
     * @augments System.Attribute
     */
    Bridge.define("System.Reflection.ObfuscateAssemblyAttribute", {
        inherits: [System.Attribute],
        fields: {
            m_assemblyIsPrivate: false,
            m_stripAfterObfuscation: false
        },
        props: {
            /**
             * Gets a {@link } value indicating whether the assembly was marked private.
             *
             * @instance
             * @public
             * @readonly
             * @memberof System.Reflection.ObfuscateAssemblyAttribute
             * @function AssemblyIsPrivate
             * @type boolean
             */
            AssemblyIsPrivate: {
                get: function () {
                    return this.m_assemblyIsPrivate;
                }
            },
            /**
             * Gets or sets a {@link } value indicating whether the obfuscation tool should remove the attribute after processing.
             *
             * @instance
             * @public
             * @memberof System.Reflection.ObfuscateAssemblyAttribute
             * @function StripAfterObfuscation
             * @type boolean
             */
            StripAfterObfuscation: {
                get: function () {
                    return this.m_stripAfterObfuscation;
                },
                set: function (value) {
                    this.m_stripAfterObfuscation = value;
                }
            }
        },
        ctors: {
            /**
             * Initializes a new instance of the {@link } class,
             specifying whether the assembly to be obfuscated is public or private.
             *
             * @instance
             * @public
             * @this System.Reflection.ObfuscateAssemblyAttribute
             * @memberof System.Reflection.ObfuscateAssemblyAttribute
             * @param   {boolean}    assemblyIsPrivate    <pre><code>true</code></pre> if the assembly is used within the scope of one application; otherwise, <pre><code>false</code></pre>.
             * @return  {void}
             */
            ctor: function (assemblyIsPrivate) {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this.m_assemblyIsPrivate = assemblyIsPrivate;
                this.m_stripAfterObfuscation = true;
            }
        }
    });

    /**
     * Instructs obfuscation tools to take the specified actions for an assembly, type, or member.
     *
     * @class System.Reflection.ObfuscationAttribute
     * @augments System.Attribute
     */
    Bridge.define("System.Reflection.ObfuscationAttribute", {
        inherits: [System.Attribute],
        fields: {
            m_applyToMembers: false,
            m_exclude: false,
            m_feature: null,
            m_stripAfterObfuscation: false
        },
        props: {
            /**
             * Gets or sets a {@link } value indicating whether the attribute of a type is to apply to the members of the type.
             *
             * @instance
             * @public
             * @memberof System.Reflection.ObfuscationAttribute
             * @function ApplyToMembers
             * @type boolean
             */
            ApplyToMembers: {
                get: function () {
                    return this.m_applyToMembers;
                },
                set: function (value) {
                    this.m_applyToMembers = value;
                }
            },
            /**
             * Gets or sets a {@link } value indicating whether the obfuscation tool should exclude the type or member from obfuscation.
             *
             * @instance
             * @public
             * @memberof System.Reflection.ObfuscationAttribute
             * @function Exclude
             * @type boolean
             */
            Exclude: {
                get: function () {
                    return this.m_exclude;
                },
                set: function (value) {
                    this.m_exclude = value;
                }
            },
            /**
             * Gets or sets a string value that is recognized by the obfuscation tool, and which specifies processing options.
             *
             * @instance
             * @public
             * @memberof System.Reflection.ObfuscationAttribute
             * @function Feature
             * @type string
             */
            Feature: {
                get: function () {
                    return this.m_feature;
                },
                set: function (value) {
                    this.m_feature = value;
                }
            },
            /**
             * Gets or sets a {@link } value indicating whether the obfuscation tool should remove the attribute after processing.
             *
             * @instance
             * @public
             * @memberof System.Reflection.ObfuscationAttribute
             * @function StripAfterObfuscation
             * @type boolean
             */
            StripAfterObfuscation: {
                get: function () {
                    return this.m_stripAfterObfuscation;
                },
                set: function (value) {
                    this.m_stripAfterObfuscation = value;
                }
            }
        },
        ctors: {
            /**
             * Initializes a new instance of the {@link } class.
             *
             * @instance
             * @public
             * @this System.Reflection.ObfuscationAttribute
             * @memberof System.Reflection.ObfuscationAttribute
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this.m_applyToMembers = true;
                this.m_exclude = true;
                this.m_feature = "all";
                this.m_stripAfterObfuscation = true;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJJbmRpZVJhY2Vyc1dFLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyIuLi8uLi9fY3MvQnJpZGdlTmV0LkFpZGUuY3MiLCIuLi8uLi9fY3MvQnJpZGdlTmV0LkV2ZW5lbWVudFRhc2suY3MiLCJJbmRpZVJhY2Vyc1dFLmNzIiwiLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcyAoeDg2KS9HYXBvdGNoZW5rby9FYXpmdXNjYXRvci5ORVQvQ29kZSBTbmlwcGV0cy9DIy9PYmZ1c2NhdGlvbkF0dHJpYnV0ZXMuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0RBWTBEQTtvQkFFOUNBLGVBQXdDQSxJQUFJQTs7b0JBRTVDQSxtQkFBOEJBLElBQUlBO29CQUNsQ0Esa0NBQWtDQTt3QkFFOUJBLElBQUlBLDRCQUEyQkE7NEJBRTNCQSxJQUFJQTtnQ0FFQUEsTUFBTUEsSUFBSUE7Ozs0QkFHZEEsc0JBQXNCQTs7OztvQkFJOUJBLHlCQUF5QkE7b0JBQ3pCQTs7b0JBRUFBLE9BQU9BOzs7Ozs7Ozs7Ozs7O2tEQU0rQkEsUUFBZUE7b0JBRXJEQSxtQkFBOEJBLElBQUlBO29CQUNsQ0Esa0NBQWtDQTt3QkFFOUJBLElBQUlBLDRCQUEyQkE7NEJBRTNCQSxJQUFJQTtnQ0FFQUEsY0FBY0E7Ozs0QkFHbEJBLGNBQWNBOzs7O29CQUl0QkEseUJBQXlCQTtvQkFDekJBOzs7Ozs7Ozs7Ozs7Ozs7Z0JDM0JBQSxlQUFVQSwrQkFBQ0E7b0JBRVBBOzs7Ozs7Ozs7Ozs7Ozs7Z0JBaEJKQSxlQUFVQSwrQkFBQ0E7b0JBRVBBLGtCQUFhQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NDaUJqQkEsZUFBdUNBLElBQUlBO2dDQUMzQ0EsZ0JBQWdCQTs7Z0NBRWhCQSxXQUF3QkE7O2dDQUV4QkEsU0FBb0RBOzs7Ozs7Ozs7O2dEQUF2QkEsSUFBSUEsdUJBQWFBO2dDQUM5Q0EsV0FBNEJBLEtBQUlBOzs7Z0NBRWhDQSxVQUFpQkE7Z0NBQ2pCQSxJQUFJQSxXQUFXQTs7Ozs7Ozs7Z0NBRVhBLGFBQWFBLHdDQUFnQkE7Z0NBQzdCQTs7OztnQ0FHSkEsU0FBTUEsb0NBQ0RBLG1CQUNEQSxVQUNBQSxvQ0FBaUNBOzs7Ozs7Ozs7O2dDQUVyQ0E7b0NBRUlBLFlBQTBCQSxJQUFJQTtvQ0FDOUJBLE1BQWFBLElBQUlBO29DQUNqQkEsT0FBT0E7d0NBRUhBLFdBQWlCQSxjQUFZQTt3Q0FDN0JBLFVBQWVBLGlCQUFTQTt3Q0FDeEJBLGtCQUFrQkE7O3dDQUVsQkEsV0FBa0JBO3dDQUNsQkEsV0FBV0EsNkRBQWlDQTt3Q0FDNUNBLFdBQVdBLDREQUFnQ0E7d0NBQzNDQSxXQUFXQSwrREFBbUNBO3dDQUM5Q0EsV0FBV0Esa0VBQXNDQTs7d0NBRWpEQSxJQUFJQTs0Q0FFQUEsV0FBV0EsK0RBQW1DQSxpQ0FBZ0NBOzRDQUM5RUEsV0FBV0E7OzRDQUlYQSxXQUFXQTs0Q0FDWEEsV0FBV0E7Ozt3Q0FHZkEsaUJBQWlCQTs7O29DQUdyQkEsMEJBQTBCQSw4RUFBNERBOzs7b0NBSXRGQSwwQkFBMEJBOzs7Ozs7Ozs7Ozs7Ozs7MkNBcEVNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRDQUVwQ0EsU0FHcUJBLGdEQUFzQ0EsY0FBYUE7Ozs7Ozs7Ozs7cURBQ3BEQSxnREFBc0NBLGNBQWFBOzs7Ozs7Ozs7O3FEQUMvQ0EsZ0RBQXNDQSxjQUFhQTs7Ozs7Ozs7OztxREFDakRBLGdEQUFzQ0EsY0FBYUE7Ozs7Ozs7Ozs7MkRBTnRFQSxVQUFJQSwrQ0FFS0Esd0JBQ0RBLDRCQUNEQSwrQkFDSUEsa0NBQ0VBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDb0JkQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7b0JBY1BBLE9BQU9BOzs7b0JBQ1BBLCtCQUEwQkE7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBL0JGQTs7O2dCQUU5QkEsMkJBQXNCQTtnQkFDdEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQTJETUEsT0FBT0E7OztvQkFDUEEsd0JBQW1CQTs7Ozs7Ozs7Ozs7Ozs7b0JBY25CQSxPQUFPQTs7O29CQUNQQSxpQkFBWUE7Ozs7Ozs7Ozs7Ozs7O29CQWFaQSxPQUFPQTs7O29CQUNQQSxpQkFBWUE7Ozs7Ozs7Ozs7Ozs7O29CQWNaQSxPQUFPQTs7O29CQUNQQSwrQkFBMEJBOzs7Ozs7Ozs7Ozs7Ozs7OztnQkE3RGhDQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLklPO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIG5ldC5zeWxkZS5CcmlkZ2VOZXRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFpZGVcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIElPRXhjZXB0aW9uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFRhc2s8c3RyaW5nPiBjc0h0dHBHZXRTdHJpbmdBc3luY19zKHN0cmluZyDDuVVybF9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFza0NvbXBsZXRpb25Tb3VyY2U8c3RyaW5nPiDDuVJldF90Y3MgPSBuZXcgVGFza0NvbXBsZXRpb25Tb3VyY2U8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgWE1MSHR0cFJlcXVlc3Qgw7lSZXF1ZXRlX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICDDuVJlcXVldGVfeGhyLk9uUmVhZHlTdGF0ZUNoYW5nZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICjDuVJlcXVldGVfeGhyLlJlYWR5U3RhdGUgPT0gQWpheFJlYWR5U3RhdGUuRG9uZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAow7lSZXF1ZXRlX3hoci5TdGF0dXMgIT0gMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IElPRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICDDuVJldF90Y3MuVHJ5U2V0UmVzdWx0KMO5UmVxdWV0ZV94aHIuUmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIMO5UmVxdWV0ZV94aHIuT3BlbihcIkdFVFwiLCDDuVVybF9zLCB0cnVlKTtcclxuICAgICAgICAgICAgw7lSZXF1ZXRlX3hoci5TZW5kKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gw7lSZXRfdGNzLlRhc2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIElPRXhjZXB0aW9uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgdHNIdHRwR2V0U3RyaW5nU3RhcnRfcyhzdHJpbmcgw7lVcmxfcywgQWN0aW9uPHN0cmluZz4gw7lPblJlc3VsdGF0X2EpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYTUxIdHRwUmVxdWVzdCDDuVJlcXVldGVfeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIMO5UmVxdWV0ZV94aHIuT25SZWFkeVN0YXRlQ2hhbmdlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKMO5UmVxdWV0ZV94aHIuUmVhZHlTdGF0ZSA9PSBBamF4UmVhZHlTdGF0ZS5Eb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICjDuVJlcXVldGVfeGhyLlN0YXR1cyAhPSAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICDDuU9uUmVzdWx0YXRfYShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIMO5T25SZXN1bHRhdF9hKMO5UmVxdWV0ZV94aHIuUmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIMO5UmVxdWV0ZV94aHIuT3BlbihcIkdFVFwiLCDDuVVybF9zLCB0cnVlKTtcclxuICAgICAgICAgICAgw7lSZXF1ZXRlX3hoci5TZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uSU87XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgbmV0LnN5bGRlLkJyaWRnZU5ldFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRXZlbmVtZW50VGFzazxFPiA6IFRhc2tDb21wbGV0aW9uU291cmNlPEU+XHJcbiAgICAgICAgd2hlcmUgRSA6IEhUTUxFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEV2ZW5lbWVudFRhc2soKSA6XHJcbiAgICAgICAgICAgIGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY0ZpcmVfYSA9IChFdmVudDxFPiDDuWUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRyeVNldFJlc3VsdCjDuWUuQ3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQWN0aW9uPEV2ZW50PEU+PiBjRmlyZV9hO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFdmVuZW1lbnRUYXNrIDogVGFza0NvbXBsZXRpb25Tb3VyY2U8Ym9vbD5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRXZlbmVtZW50VGFzaygpIDpcclxuICAgICAgICAgICAgYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjRmlyZV9hID0gKEV2ZW50IMO5ZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHJ5U2V0UmVzdWx0KGZhbHNlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBY3Rpb248RXZlbnQ+IGNGaXJlX2E7XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgbmV0LnN5bGRlXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBJbmRpZVJhY2Vyc1dFXHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3MgR2FtZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBfRm9sZGVyX3M7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgX0ltZ1VybF9zO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIF9UaXRsZV9zO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIF9TdWJUaXRsZV9zO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIF9EZXNjcmlwdGlvbl9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGFzeW5jIFRhc2s8R2FtZT4gY3NJbml0R2FtZUFzeW5jKHN0cmluZyBzR2FtZV9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHYW1lKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX0ZvbGRlcl9zID0gc0dhbWVfcyxcclxuICAgICAgICAgICAgICAgIF9JbWdVcmxfcyA9YXdhaXQgQnJpZGdlTmV0LkFpZGUuY3NIdHRwR2V0U3RyaW5nQXN5bmNfcyhcInIvZ2FtZXMvXCIgKyBzR2FtZV9zICsgXCIvaW1nVXJsT3B0aW9uYWwudHh0XCIpLFxyXG4gICAgICAgICAgICAgICAgX1RpdGxlX3MgPWF3YWl0IEJyaWRnZU5ldC5BaWRlLmNzSHR0cEdldFN0cmluZ0FzeW5jX3MoXCJyL2dhbWVzL1wiICsgc0dhbWVfcyArIFwiL3RpdGxlLnR4dFwiKSxcclxuICAgICAgICAgICAgICAgIF9TdWJUaXRsZV9zID0gYXdhaXQgQnJpZGdlTmV0LkFpZGUuY3NIdHRwR2V0U3RyaW5nQXN5bmNfcyhcInIvZ2FtZXMvXCIgKyBzR2FtZV9zICsgXCIvc3VidGl0bGUudHh0XCIpLFxyXG4gICAgICAgICAgICAgICAgX0Rlc2NyaXB0aW9uX3MgPWF3YWl0IEJyaWRnZU5ldC5BaWRlLmNzSHR0cEdldFN0cmluZ0FzeW5jX3MoXCJyL2dhbWVzL1wiICsgc0dhbWVfcyArIFwiL2Rlc2NyaXB0aW9uLnR4dFwiKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhc3luYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpZGdlTmV0LkV2ZW5lbWVudFRhc2sgw7lPbldpbmRvd19vZSA9IG5ldyBCcmlkZ2VOZXQuRXZlbmVtZW50VGFzaygpO1xyXG4gICAgICAgICAgICBXaW5kb3cuT25Mb2FkID0gw7lPbldpbmRvd19vZS5jRmlyZV9hO1xyXG5cclxuICAgICAgICAgICAgVGFzazxzdHJpbmc+IMO5TW9kZWxfdCA9IEJyaWRnZU5ldC5BaWRlLmNzSHR0cEdldFN0cmluZ0FzeW5jX3MoXCJyL2dhbWVzL21vZGVsLnR4dFwiKTtcclxuXHJcbiAgICAgICAgICAgIFN0cmluZ1JlYWRlciDDuUdhbWVzTGlzdF9zciA9IG5ldyBTdHJpbmdSZWFkZXIoYXdhaXQgQnJpZGdlTmV0LkFpZGUuY3NIdHRwR2V0U3RyaW5nQXN5bmNfcyhcInIvZ2FtZXMvbGlzdC50eHRcIikpO1xyXG4gICAgICAgICAgICBMaXN0PFRhc2s8R2FtZT4+IMO5R2FtZXNfbCA9IG5ldyBMaXN0PFRhc2s8R2FtZT4+KCk7XHJcbiAgICAgICAgX0xJU1Q6XHJcbiAgICAgICAgICAgIHN0cmluZyDDuUdhbWVfcyA9IMO5R2FtZXNMaXN0X3NyLlJlYWRMaW5lKCk7XHJcbiAgICAgICAgICAgIGlmICjDuUdhbWVfcyAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICDDuUdhbWVzX2wuQWRkKGNzSW5pdEdhbWVBc3luYyjDuUdhbWVfcykpO1xyXG4gICAgICAgICAgICAgICAgZ290byBfTElTVDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsXHJcbiAgICAgICAgICAgICAgICAow7lPbldpbmRvd19vZS5UYXNrLFxyXG4gICAgICAgICAgICAgICAgw7lNb2RlbF90LFxyXG4gICAgICAgICAgICAgICAgVGFzay5XaGVuQWxsPEluZGllUmFjZXJzV0UuR2FtZT4ow7lHYW1lc19sKSk7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nQnVpbGRlciDDuUdhbWVzX3NiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbSDDuV9yID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKMO5R2FtZXNfbC5Db3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSW50MzIgc0lkeF9zMzIgPSDDuV9yLk5leHQoMCwgw7lHYW1lc19sLkNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lIMO5R2FtZV9nID0gw7lHYW1lc19sW3NJZHhfczMyXS5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgw7lHYW1lc19sLlJlbW92ZUF0KHNJZHhfczMyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIMO5TW9kZWxfcyA9IMO5TW9kZWxfdC5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgw7lNb2RlbF9zID0gw7lNb2RlbF9zLlJlcGxhY2UoXCLCp0dhbWVGb2xkZXLCp1wiLCDDuUdhbWVfZy5fRm9sZGVyX3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIMO5TW9kZWxfcyA9IMO5TW9kZWxfcy5SZXBsYWNlKFwiwqdHYW1lVGl0bGXCp1wiLCDDuUdhbWVfZy5fVGl0bGVfcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgw7lNb2RlbF9zID0gw7lNb2RlbF9zLlJlcGxhY2UoXCLCp0dhbWVTdWJUaXRsZcKnXCIsIMO5R2FtZV9nLl9TdWJUaXRsZV9zKTtcclxuICAgICAgICAgICAgICAgICAgICDDuU1vZGVsX3MgPSDDuU1vZGVsX3MuUmVwbGFjZShcIsKnR2FtZURlc2NyaXB0aW9uwqdcIiwgw7lHYW1lX2cuX0Rlc2NyaXB0aW9uX3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAow7lHYW1lX2cuX0ltZ1VybF9zLkxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICDDuU1vZGVsX3MgPSDDuU1vZGVsX3MuUmVwbGFjZShcIsKnaW1nTGlua1N0YXJ0wqdcIiwgXCI8YSB0YXJnZXQ9XFxcImJsYW5rXFxcIiBocmVmPVxcXCJcIiArIMO5R2FtZV9nLl9JbWdVcmxfcyArIFwiXFxcIj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIMO5TW9kZWxfcyA9IMO5TW9kZWxfcy5SZXBsYWNlKFwiwqdpbWdMaW5rRW5kwqdcIiwgXCI8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICDDuU1vZGVsX3MgPSDDuU1vZGVsX3MuUmVwbGFjZShcIsKnaW1nTGlua1N0YXJ0wqdcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIMO5TW9kZWxfcyA9IMO5TW9kZWxfcy5SZXBsYWNlKFwiwqdpbWdMaW5rRW5kwqdcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICDDuUdhbWVzX3NiLkFwcGVuZCjDuU1vZGVsX3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIERvY3VtZW50LkJvZHkuSW5uZXJIVE1MID0gRG9jdW1lbnQuQm9keS5Jbm5lckhUTUwuUmVwbGFjZShcIjxkaXYgaWQ9XFxcImdhbWVzXFxcIj48L2Rpdj5cIiwgw7lHYW1lc19zYi5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaChFeGNlcHRpb24gw7lFeClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5Jbm5lckhUTUwgPSDDuUV4LlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gICAgICAgICAgRGVmaW5pdGlvbiBvZiBDdXN0b20gQXR0cmlidXRlcyBmb3IgRGVjbGFyYXRpdmUgT2JmdXNjYXRpb25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gVGhpcyBmaWxlIGlzIG9ubHkgbmVjZXNzYXJ5IGZvciB0aGUgcHJvamVjdHMgdGFyZ2V0aW5nIG9uZSBvZiB0aGUgZm9sbG93aW5nXHJcbi8vIGZyYW1ld29ya3M6XHJcbi8vXHJcbi8vICAgLSAuTkVUIENvcmUgMS4xIG9yIGxvd2VyXHJcbi8vICAgLSBVbml2ZXJzYWwgV2luZG93cyBQbGF0Zm9ybSAoVVdQKSB2ZXJzaW9uIDEwLjAuMTUwNjMgb3IgbG93ZXJcclxuLy8gICAtIFBvcnRhYmxlIENsYXNzIExpYnJhcnkgKFBDTClcclxuLy8gICAtIFdpblJUXHJcbi8vICAgLSBTaWx2ZXJsaWdodFxyXG4vLyAgIC0gLk5FVCBDb21wYWN0IEZyYW1ld29ya1xyXG4vL1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uUnVudGltZS5JbnRlcm9wU2VydmljZXM7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLlJlZmxlY3Rpb25cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEluc3RydWN0cyBvYmZ1c2NhdGlvbiB0b29scyB0byB1c2UgdGhlaXIgc3RhbmRhcmQgb2JmdXNjYXRpb24gcnVsZXMgZm9yIHRoZSBhcHByb3ByaWF0ZSBhc3NlbWJseSB0eXBlLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIFtBdHRyaWJ1dGVVc2FnZShBdHRyaWJ1dGVUYXJnZXRzLkFzc2VtYmx5LCBBbGxvd011bHRpcGxlID0gZmFsc2UsIEluaGVyaXRlZCA9IGZhbHNlKV1cclxuICAgIHNlYWxlZCBjbGFzcyBPYmZ1c2NhdGVBc3NlbWJseUF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIDxzZWUgY3JlZj1cIk9iZnVzY2F0ZUFzc2VtYmx5QXR0cmlidXRlXCIvPiBjbGFzcyxcclxuICAgICAgICAvLy8gc3BlY2lmeWluZyB3aGV0aGVyIHRoZSBhc3NlbWJseSB0byBiZSBvYmZ1c2NhdGVkIGlzIHB1YmxpYyBvciBwcml2YXRlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXNzZW1ibHlJc1ByaXZhdGVcIj48Yz50cnVlPC9jPiBpZiB0aGUgYXNzZW1ibHkgaXMgdXNlZCB3aXRoaW4gdGhlIHNjb3BlIG9mIG9uZSBhcHBsaWNhdGlvbjsgb3RoZXJ3aXNlLCA8Yz5mYWxzZTwvYz4uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgT2JmdXNjYXRlQXNzZW1ibHlBdHRyaWJ1dGUoYm9vbCBhc3NlbWJseUlzUHJpdmF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1fYXNzZW1ibHlJc1ByaXZhdGUgPSBhc3NlbWJseUlzUHJpdmF0ZTtcclxuICAgICAgICAgICAgbV9zdHJpcEFmdGVyT2JmdXNjYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm9vbCBtX2Fzc2VtYmx5SXNQcml2YXRlO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldHMgYSA8c2VlIGNyZWY9XCJTeXN0ZW0uQm9vbGVhblwiLz4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBhc3NlbWJseSB3YXMgbWFya2VkIHByaXZhdGUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHZhbHVlPlxyXG4gICAgICAgIC8vLyA8Yz50cnVlPC9jPiBpZiB0aGUgYXNzZW1ibHkgd2FzIG1hcmtlZCBwcml2YXRlOyBvdGhlcndpc2UsIDxjPmZhbHNlPC9jPi5cclxuICAgICAgICAvLy8gPC92YWx1ZT5cclxuICAgICAgICBwdWJsaWMgYm9vbCBBc3NlbWJseUlzUHJpdmF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIG1fYXNzZW1ibHlJc1ByaXZhdGU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJvb2wgbV9zdHJpcEFmdGVyT2JmdXNjYXRpb247XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2V0cyBvciBzZXRzIGEgPHNlZSBjcmVmPVwiU3lzdGVtLkJvb2xlYW5cIi8+IHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgb2JmdXNjYXRpb24gdG9vbCBzaG91bGQgcmVtb3ZlIHRoZSBhdHRyaWJ1dGUgYWZ0ZXIgcHJvY2Vzc2luZy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dmFsdWU+XHJcbiAgICAgICAgLy8vIDxjPnRydWU8L2M+IGlmIHRoZSBvYmZ1c2NhdGlvbiB0b29sIHNob3VsZCByZW1vdmUgdGhlIGF0dHJpYnV0ZSBhZnRlciBwcm9jZXNzaW5nOyBvdGhlcndpc2UsIDxjPmZhbHNlPC9jPi5cclxuICAgICAgICAvLy8gVGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoaXMgcHJvcGVydHkgaXMgPGM+dHJ1ZTwvYz4uXHJcbiAgICAgICAgLy8vIDwvdmFsdWU+XHJcbiAgICAgICAgcHVibGljIGJvb2wgU3RyaXBBZnRlck9iZnVzY2F0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gbV9zdHJpcEFmdGVyT2JmdXNjYXRpb247IH1cclxuICAgICAgICAgICAgc2V0IHsgbV9zdHJpcEFmdGVyT2JmdXNjYXRpb24gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gSW5zdHJ1Y3RzIG9iZnVzY2F0aW9uIHRvb2xzIHRvIHRha2UgdGhlIHNwZWNpZmllZCBhY3Rpb25zIGZvciBhbiBhc3NlbWJseSwgdHlwZSwgb3IgbWVtYmVyLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIFtBdHRyaWJ1dGVVc2FnZShBdHRyaWJ1dGVUYXJnZXRzLkRlbGVnYXRlIHwgQXR0cmlidXRlVGFyZ2V0cy5QYXJhbWV0ZXIgfCBBdHRyaWJ1dGVUYXJnZXRzLkludGVyZmFjZSB8IEF0dHJpYnV0ZVRhcmdldHMuRXZlbnQgfCBBdHRyaWJ1dGVUYXJnZXRzLkZpZWxkIHwgQXR0cmlidXRlVGFyZ2V0cy5Qcm9wZXJ0eSB8IEF0dHJpYnV0ZVRhcmdldHMuTWV0aG9kIHwgQXR0cmlidXRlVGFyZ2V0cy5FbnVtIHwgQXR0cmlidXRlVGFyZ2V0cy5TdHJ1Y3QgfCBBdHRyaWJ1dGVUYXJnZXRzLkNsYXNzIHwgQXR0cmlidXRlVGFyZ2V0cy5Bc3NlbWJseSwgQWxsb3dNdWx0aXBsZSA9IHRydWUsIEluaGVyaXRlZCA9IGZhbHNlKV1cclxuICAgIHNlYWxlZCBjbGFzcyBPYmZ1c2NhdGlvbkF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIDxzZWUgY3JlZj1cIk9iZnVzY2F0aW9uQXR0cmlidXRlXCIvPiBjbGFzcy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBPYmZ1c2NhdGlvbkF0dHJpYnV0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fYXBwbHlUb01lbWJlcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fZXhjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9mZWF0dXJlID0gXCJhbGxcIjtcclxuICAgICAgICAgICAgdGhpcy5tX3N0cmlwQWZ0ZXJPYmZ1c2NhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIG1fYXBwbHlUb01lbWJlcnM7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2V0cyBvciBzZXRzIGEgPHNlZSBjcmVmPVwiU3lzdGVtLkJvb2xlYW5cIi8+IHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgYXR0cmlidXRlIG9mIGEgdHlwZSBpcyB0byBhcHBseSB0byB0aGUgbWVtYmVycyBvZiB0aGUgdHlwZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dmFsdWU+XHJcbiAgICAgICAgLy8vIDxjPnRydWU8L2M+IGlmIHRoZSBhdHRyaWJ1dGUgaXMgdG8gYXBwbHkgdG8gdGhlIG1lbWJlcnMgb2YgdGhlIHR5cGU7IG90aGVyd2lzZSwgPGM+ZmFsc2U8L2M+LiBUaGUgZGVmYXVsdCBpcyA8Yz50cnVlPC9jPi5cclxuICAgICAgICAvLy8gPC92YWx1ZT5cclxuICAgICAgICBwdWJsaWMgYm9vbCBBcHBseVRvTWVtYmVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIG1fYXBwbHlUb01lbWJlcnM7IH1cclxuICAgICAgICAgICAgc2V0IHsgbV9hcHBseVRvTWVtYmVycyA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIG1fZXhjbHVkZTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHZXRzIG9yIHNldHMgYSA8c2VlIGNyZWY9XCJTeXN0ZW0uQm9vbGVhblwiLz4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBvYmZ1c2NhdGlvbiB0b29sIHNob3VsZCBleGNsdWRlIHRoZSB0eXBlIG9yIG1lbWJlciBmcm9tIG9iZnVzY2F0aW9uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx2YWx1ZT5cclxuICAgICAgICAvLy8gPGM+dHJ1ZTwvYz4gaWYgdGhlIHR5cGUgb3IgbWVtYmVyIHRvIHdoaWNoIHRoaXMgYXR0cmlidXRlIGlzIGFwcGxpZWQgc2hvdWxkIGJlIGV4Y2x1ZGVkIGZyb20gb2JmdXNjYXRpb247IG90aGVyd2lzZSwgPGM+ZmFsc2U8L2M+LlxyXG4gICAgICAgIC8vLyBUaGUgZGVmYXVsdCBpcyA8Yz50cnVlPC9jPi5cclxuICAgICAgICAvLy8gPC92YWx1ZT5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFeGNsdWRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gbV9leGNsdWRlOyB9XHJcbiAgICAgICAgICAgIHNldCB7IG1fZXhjbHVkZSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHJpbmcgbV9mZWF0dXJlO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldHMgb3Igc2V0cyBhIHN0cmluZyB2YWx1ZSB0aGF0IGlzIHJlY29nbml6ZWQgYnkgdGhlIG9iZnVzY2F0aW9uIHRvb2wsIGFuZCB3aGljaCBzcGVjaWZpZXMgcHJvY2Vzc2luZyBvcHRpb25zLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx2YWx1ZT5cclxuICAgICAgICAvLy8gQSBzdHJpbmcgdmFsdWUgdGhhdCBpcyByZWNvZ25pemVkIGJ5IHRoZSBvYmZ1c2NhdGlvbiB0b29sLCBhbmQgd2hpY2ggc3BlY2lmaWVzIHByb2Nlc3Npbmcgb3B0aW9ucy4gVGhlIGRlZmF1bHQgaXMgXCJhbGxcIi5cclxuICAgICAgICAvLy8gPC92YWx1ZT5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEZlYXR1cmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBtX2ZlYXR1cmU7IH1cclxuICAgICAgICAgICAgc2V0IHsgbV9mZWF0dXJlID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJvb2wgbV9zdHJpcEFmdGVyT2JmdXNjYXRpb247XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2V0cyBvciBzZXRzIGEgPHNlZSBjcmVmPVwiU3lzdGVtLkJvb2xlYW5cIi8+IHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgb2JmdXNjYXRpb24gdG9vbCBzaG91bGQgcmVtb3ZlIHRoZSBhdHRyaWJ1dGUgYWZ0ZXIgcHJvY2Vzc2luZy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dmFsdWU+XHJcbiAgICAgICAgLy8vIDxjPnRydWU8L2M+IGlmIHRoZSBvYmZ1c2NhdGlvbiB0b29sIHNob3VsZCByZW1vdmUgdGhlIGF0dHJpYnV0ZSBhZnRlciBwcm9jZXNzaW5nOyBvdGhlcndpc2UsIDxjPmZhbHNlPC9jPi5cclxuICAgICAgICAvLy8gVGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoaXMgcHJvcGVydHkgaXMgPGM+dHJ1ZTwvYz4uXHJcbiAgICAgICAgLy8vIDwvdmFsdWU+XHJcbiAgICAgICAgcHVibGljIGJvb2wgU3RyaXBBZnRlck9iZnVzY2F0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gbV9zdHJpcEFmdGVyT2JmdXNjYXRpb247IH1cclxuICAgICAgICAgICAgc2V0IHsgbV9zdHJpcEFmdGVyT2JmdXNjYXRpb24gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
