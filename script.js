/* ==== 1) Image de fond par passage (appliquée sur #story) ==== */
$(document).on(':passagedisplay', function () {
    const map = {
        "TitleScreen": "images/titre.png",
        "Acte1Choix1A": "images/story/Acte1Choix1A.png",
        "Acte1Choix1B": "images/story/Acte1Choix1B.png",
        "Acte1Choix2A": "images/story/Acte1Choix2A.png",
        "Acte1Choix2B": "images/story/Acte1Choix2B.png",
        "Acte1Hub": "images/story/Acte1Hub.png",
        "Acte1Rejoin1": "images/story/Acte1Rejoin1.png",
        "Acte1Rejoin2": "images/story/Acte1Rejoin2.png",
        "Acte2Choix1A": "images/story/Acte2Choix1A.png",
        "Acte2Choix1B": "images/story/Acte2Choix1B.png",
        "Acte2Choix2A": "images/story/Acte2Choix2A.png",
        "Acte2Choix2B": "images/story/Acte2Choix2B.png",
        "Acte2Hub": "images/story/Acte2Hub.png",
        "Acte2Rejoin1": "images/story/Acte2Rejoin1.png",
        "Acte2Rejoin2": "images/story/Acte2Rejoin2.png",
        "Acte3Bifurcation": "images/story/Acte3Bifurcation.png",
        "Acte3Choix1A": "images/story/Acte3Choix1A.png",
        "Acte3Choix1B": "images/story/Acte3Choix1B.png",
        "Acte3FinaleA1": "images/story/Acte3FinaleA1.png",
        "Acte3FinaleB1": "images/story/Acte3FinaleB1.png",
        "Acte3FinaleC1": "images/story/Acte3FinaleC1.png",
        "Acte3Hub": "images/story/Acte3Hub.png",
        "Acte3Rejoin1": "images/story/Acte3Rejoin1.png",
        "Fin-Chute": "images/story/Fin-Chute.png",
        "Fin-Oubli": "images/story/Fin-Oubli.png",
        "Fin-Renaissance": "images/story/Fin-Renaissance.png",
        "Start": "images/story/Start.png"
    };

    const src = map[(window.SugarCube && SugarCube.State ? SugarCube.State.passage : State.passage)] || "images/story/Start.png";

    $('#story').css({
        'background-image': 'url(' + src + ')',
        'background-size': 'cover',
        'background-position': 'center center',
        'background-repeat': 'no-repeat'
    });
});


/* ==== 2) Page de titre: clic n’importe où -> Start, sauf UI/Lexique ==== */
(function () {
    // Sélecteurs à considérer comme "zone UI" (ne doivent pas déclencher Start)
    const UI_BLOCK = [
        '#ui-bar',
        '#ui-bar-toggle',
        '#hamburger-btn',
        '#hamburger-menu',
        '#ui-dialog',
        '#ui-overlay',
        '#lexique-btn',
        '#lexique-overlay',
        '#lexique-box',
        '.tw-save',
        '.tw-settings' // etc. ajoute ce qu'il faut ici
    ].join(',');

    // Horodatage entrée TitleScreen pour ignorer les clics involontaires (anti-« clic hérité »)
    let __titleEnterAt = 0;
    // Flag prêt à accepter un clic utilisateur (après un court délai)
    let __titleReadyClick = false;

    // Handler global namespacé
    function titleClickHandler(ev) {
        if ((window.SugarCube && SugarCube.State ? SugarCube.State.passage : State.passage) !== 'TitleScreen') return;
        // Exiger un clic utilisateur véritable
        //
                // Ignore le très court délai initial pour éviter un clic hérité
                if (typeof performance !== 'undefined' && performance.now() - __titleEnterAt < 220) return;
        if ($('body').hasClass('lexique-open')) return;
        if ($(ev.target).closest(UI_BLOCK).length) return;

        if (window.SugarCube && SugarCube.Engine && typeof SugarCube.Engine.play === 'function') {
            SugarCube.Engine.play('Start');
        }
    }

    // Sur chaque affichage de passage on active / désactive le listener
    $(document).on(':passagedisplay.titleOverlay', function () {
        if ((window.SugarCube && SugarCube.State ? SugarCube.State.passage : State.passage) === 'TitleScreen') {
            if (!$('#title-overlay').length) {
                $('<div id="title-overlay"></div>').appendTo('body').css({
                    position: 'fixed',
                    inset: '0',
                    cursor: 'pointer',
                    background: 'transparent',
                    'z-index': 2000
                });
            } else {
                $('#title-overlay').show();
            }

            $('#title-overlay').off('click.titleStart');
            $(document).off('click.titleStart');
            // Horodatage: empêche un clic hérité de lancer 'Start' immédiatement
            __titleEnterAt = (typeof performance !== 'undefined' ? performance.now() : Date.now());
            __titleReadyClick = false;
            // Écouteur à la fois sur l’overlay et en secours sur document
            $('#title-overlay').on('click.titleStart', titleClickHandler);
            $(document).on('click.titleStart', titleClickHandler);
            console.log('TitleScreen : overlay prêt');
            // Désactive momentanément les clics hérités qui déclenchent Start immédiatement
            $('#title-overlay').css('pointer-events','none');
            setTimeout(function () {
                $('#title-overlay').css('pointer-events','auto');
                __titleReadyClick = true; // prêt à accepter un clic utilisateur
            }, 200);

        } else {
            $('#title-overlay').off('click.titleStart').remove();
            $(document).off('click.titleStart');
            __titleReadyClick = false;
        }
    });
})();


/* ==== 3) Bouton + overlay Lexique (si tu les utilises globalement) ==== */
$(document).one(':storyready', function () {
    if (!$('#lexique-btn').length) {
        $('body').append('<button id="lexique-btn">Lexique</button>');
    }

    if (!$('#lexique-overlay').length) {
        $('body').append([
            '<div id="lexique-overlay" style="display:none;">',
                '<div id="lexique-box">',
                    '<button id="lexique-close">✕</button>',
                    '<h2>Lexique</h2>',
                        '<div class="lexique-list">',
                            '<p><b>Cryptomonnaie</b> : Actif numérique décentralisé reposant sur une blockchain ; transférable entre pairs, sans banques ou intermédiaires.</p>',
                            '<p><b>Mème / memecoin</b> : Blague culturelle virale ; un memecoin est un jeton crypto construit sur cet imaginaire.</p>',
                            '<p><b>pump.fun</b> : Plateforme (Solana) qui permet de créer des memecoins facilement.</p>',
                            '<p><b>Ticker</b> : Abréviation/nom court d’un token (ex. symbole en bourse).</p>',
                            '<p><b>Supply</b> : Quantité totale de tokens émise.</p>',
                            '<p><b>Taxe / tax 0/0</b> : Paramètre de frais sur les transactions, ici mis à 0% achat/vente.</p>',
                            '<p><b>LP (Liquidity Pool)</b> : Réserve de liquidité déposée sur un DEX pour permettre l’échange du token.</p>',
                            '<p><b>LP burn</b> : Destruction des jetons LP (souvent en les envoyant à une adresse brûlée) pour « verrouiller » la liquidité.</p>',
                            '<p><b>Listing DEX</b> : Mise à disposition du token sur un échange décentralisé.</p>',
                            '<p><b>DEX (Decentralized Exchange)</b> : Bourse d’échange sans intermédiaire central (ex. Orca, Raydium sur Solana).</p>',
                            '<p><b>Mint / to mint</b> : Créer/émettre de nouveaux tokens ou initier l’offre d’un nouveau token.</p>',
                            '<p><b>Wallet</b> : Portefeuille crypto permettant sa détention et de signer des transactions associées.</p>',
                            '<p><b>SOL</b> : Crypto-monnaie native de la blockchain Solana.</p>',
                            '<p><b>Bonding curve</b> : Courbe définissant le prix d’un token en fonction de la quantité achetée/émise.</p>',
                            '<p><b>Tokenomics</b> : Conception économique du token (offre, distribution, utilité, incitations).</p>',
                            '<p><b>Presale</b> : Vente préalable de tokens avant le lancement public.</p>',
                            '<p><b>Slippage</b> : Glissement de prix toléré entre soumission et exécution d’un ordre.</p>',
                            '<p><b>Rug pull / no rug</b> : Exit fraud où la liquidité est retirée ; « no rug » = promesse de ne pas tricher.</p>',
                            '<p><b>100x</b> : Multiplication théorique par cent de la valeur (slogan spéculatif).</p>',
                            '<p><b>Listing</b> : Action d’inscrire un token sur une plateforme d’échange (centralisée ou décentralisée).</p>',
                            '<p><b>Burn</b> : Destruction permanente de tokens en les rendant inaccessibles.</p>',
                            '<p><b>Whitepaper</b> : Document décrivant la vision, la technique et l’économie d’un projet.</p>',
                            '<p><b>Lambo soon</b> : Mème signifiant l’attente d’un gain rapide et massif.</p>',
                        '</div>',
                '</div>',
            '</div>'
        ].join(''));
    }
});

// Ouvrir lexique
$(document).on('click', '#lexique-btn', function () {
    $('body').addClass('lexique-open');
    $('#lexique-overlay').show();
});

// Fermer lexique (croix)
$(document).on('click', '#lexique-close', function () {
    $('#lexique-overlay').hide();
    $('body').removeClass('lexique-open');
});

// Fermer lexique (Esc)
$(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('body').hasClass('lexique-open')) {
        $('#lexique-overlay').hide();
        $('body').removeClass('lexique-open');
    }
});

/* ==== 4) Menu Hamburger remplaçant la UI bar (Last, Next, Saves/Loads, Restart) ==== */
$(document).one(':storyready', function () {
    // Injection des éléments hamburger
    if (!$('#hamburger-btn').length) {
        $('body').append(
            '<button id="hamburger-btn" aria-controls="hamburger-menu" aria-haspopup="true" aria-expanded="false" aria-label="Menu">☰</button>'
        );
    }
    if (!$('#hamburger-menu').length) {
        $('body').append([
            '<nav id="hamburger-menu" role="menu" aria-hidden="true">',
                '<div class="hm-scroll" role="none">',
                    '<button class="hm-item" data-action="back" role="menuitem">⟵ Dernier</button>',
                    '<button class="hm-item" data-action="forward" role="menuitem">Suivant ⟶</button>',
                    '<button class="hm-item" data-action="saves" role="menuitem">💾 Sauvegardes / Chargements</button>',
                    '<button class="hm-item" data-action="restart" role="menuitem">⟳ Redémarrer</button>',
                    '<a class="hm-item hm-link" role="menuitem" href="https://github.com/matBorgeaud/mon_ascension/" target="_blank" rel="noopener noreferrer" aria-label="GitHub (ouvre dans un nouvel onglet)">',
                        '<span class="hm-icon" aria-hidden="true" style="display:inline-flex; vertical-align:middle; margin-right:8px;">',
                            '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">',
                                '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>',
                            '</svg>',
                        '</span>',
                        'GitHub',
                    '</a>',
                '</div>',
            '</nav>'
        ].join(''));
    }

    // Log de détection du format et des APIs disponibles (incluant le namespace SugarCube)
    try {
        var fmt = (window.SugarCube ? ('SugarCube ' + (SugarCube.version || 'unknown'))
            : (window.storyFormat ? (storyFormat.name + ' ' + storyFormat.version) : 'unknown'));
        var hasMacroSavesWin = !!(window.Macro && ((Macro.has && Macro.has('saves')) || (Macro.get && Macro.get('saves'))));
        var hasMacroSavesSC  = !!(window.SugarCube && SugarCube.Macro && ((SugarCube.Macro.has && SugarCube.Macro.has('saves')) || (SugarCube.Macro.get && SugarCube.Macro.get('saves'))));
        console.info('[Hamburger] Format détecté:', fmt,
            '| window.Engine:', typeof window.Engine,
            '| window.Dialog:', typeof window.Dialog,
            '| window.Wikifier:', typeof window.Wikifier,
            '| window.UI.saves:', (window.UI && typeof UI.saves === 'function') ? 'function' : typeof window.UI,
            '| SugarCube.Engine:', (window.SugarCube ? typeof SugarCube.Engine : 'n/a'),
            '| SugarCube.UI:', (window.SugarCube ? typeof SugarCube.UI : 'n/a'),
            '| SugarCube.UI.saves:', (window.SugarCube && SugarCube.UI ? typeof SugarCube.UI.saves : 'n/a'),
            '| SugarCube.Dialog:', (window.SugarCube ? typeof SugarCube.Dialog : 'n/a'),
            '| SugarCube.State:', (window.SugarCube ? typeof SugarCube.State : 'n/a'),
            '| SugarCube.Wikifier:', (window.SugarCube ? typeof SugarCube.Wikifier : 'n/a'),
            '| Macro.has(saves) [window]:', hasMacroSavesWin,
            '| Macro.has(saves) [SugarCube]:', hasMacroSavesSC
        );
    } catch (_ex) {}
});

// Helpers d’ouverture/fermeture
function hmOpen() {
    $('body').addClass('menu-open');
    $('#hamburger-menu').attr('aria-hidden', 'false');
    $('#hamburger-btn').attr('aria-expanded', 'true');
    // Prépare le roving tabindex et focus sur le premier item
    setTimeout(function () {
        const $items = $('#hamburger-menu .hm-item');
        $items.attr('tabindex', '-1');
        const $first = $items.first();
        $first.attr('tabindex', '0').trigger('focus');
    }, 0);
}
function hmClose() {
    $('body').removeClass('menu-open');
    $('#hamburger-menu').attr('aria-hidden', 'true');
    $('#hamburger-btn').attr('aria-expanded', 'false');
    // Rendre le focus au bouton pour l’accessibilité
    $('#hamburger-btn').trigger('focus');
}

// Toggle via bouton
$(document).on('click', '#hamburger-btn', function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if ($('body').hasClass('menu-open')) {
        hmClose();
    } else {
        hmOpen();
    }
});

// Fermer au clic hors du menu
$(document).on('click', function (ev) {
    if (!$('body').hasClass('menu-open')) return;
    const $t = $(ev.target);
    if ($t.closest('#hamburger-btn, #hamburger-menu, #ui-dialog, #ui-overlay').length) return;
    hmClose();
});

// Fermer avec Échap quand menu ouvert
$(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('body').hasClass('menu-open')) {
        hmClose();
    }
});

// Actions du menu
$(document).on('click', '#hamburger-menu .hm-item', function (ev) {
   const $el = $(this);
   const action = $el.data('action');

   // Lien externe (ex. GitHub): ne pas bloquer la navigation, mais fermer le menu
   if (!action && $el.is('a[href]')) {
       hmClose();
       // Pour fiabilité cross‑browser, ouvrir explicitement si target défini
       const href = $el.attr('href');
       const target = $el.attr('target') || '_self';
       if (href) {
           ev.preventDefault();
           try { window.open(href, target, target === '_blank' ? 'noopener,noreferrer' : undefined); } catch (_e) {}
       }
       return;
   }

   // Actions internes: empêcher la navigation par défaut
   ev.preventDefault();

   switch (action) {
       case 'back':
           hmClose();
           if (window.SugarCube && SugarCube.Engine && typeof SugarCube.Engine.backward === 'function') {
               SugarCube.Engine.backward();
           }
           break;

       case 'forward':
           hmClose();
           if (window.SugarCube && SugarCube.Engine && typeof SugarCube.Engine.forward === 'function') {
               SugarCube.Engine.forward();
           }
           break;

       case 'saves':
           hmClose();
           // SugarCube: utiliser l’API officielle via le namespace SugarCube
           if (window.SugarCube && SugarCube.UI && typeof SugarCube.UI.saves === 'function') {
               try {
                   SugarCube.UI.saves();
                   return;
               } catch (e) {
                   console.error('[Hamburger] SugarCube.UI.saves() a échoué, tentative via Dialog:', e);
               }
           }
           // Secondaire: ouvrir un Dialog et tenter la macro si présente, sinon message
           if (window.SugarCube && SugarCube.Dialog) {
               try {
                   SugarCube.Dialog.setup('Sauvegardes / Chargements');
                   if (SugarCube.Macro && ((SugarCube.Macro.has && SugarCube.Macro.has('saves')) || (SugarCube.Macro.get && SugarCube.Macro.get('saves')))) {
                       if (typeof SugarCube.Dialog.wiki === 'function') {
                           SugarCube.Dialog.wiki('<<saves>>');
                       } else if (typeof SugarCube.Wikifier !== 'undefined') {
                           new SugarCube.Wikifier(SugarCube.Dialog.body(), '<<saves>>');
                       } else {
                           $(SugarCube.Dialog.body()).append('<p>Interface de sauvegardes non disponible.</p>');
                       }
                   } else {
                       $(SugarCube.Dialog.body()).append('<p>Interface de sauvegardes non disponible (macro <<saves>> absente). Utilisez SugarCube.UI.saves() ou vérifiez votre build SugarCube.</p>');
                   }
                   SugarCube.Dialog.open();
               } catch (e2) {
                   console.error('[Hamburger] Échec ouverture Dialog saves:', e2);
               }
           } else {
               // Non-SugarCube (ex. Harlowe)
               try { window.alert('Sauvegardes non disponibles dans ce format. Confirmez le format cible (SugarCube vs Harlowe).'); } catch (_e3) {}
           }
           break;

       case 'restart':
           hmClose();
           if (window.SugarCube && SugarCube.Engine && typeof SugarCube.Engine.restart === 'function') {
               SugarCube.Engine.restart();
           }
           break;

       default:
           break;
   }
});

// Navigation clavier dans le menu hamburger (roving tabindex + piège de focus)
$(document).on('keydown', function (e) {
   if (!$('body').hasClass('menu-open')) return;

   const $active = $(document.activeElement);

   // Si le focus n'est pas dans le menu, intercepter Tab pour entrer dans le menu
   if (!$active.closest('#hamburger-menu').length) {
       if (e.key === 'Tab') {
           const $items = $('#hamburger-menu .hm-item');
           if ($items.length) {
               e.preventDefault();
               $items.attr('tabindex', '-1');
               $items.first().attr('tabindex', '0').trigger('focus');
           }
       }
       return;
   }

   const $items = $('#hamburger-menu .hm-item');
   const idx = $items.index($active);
   if (idx === -1) return;

   function focusAt(i) {
       const $t = $items.eq(i);
       $items.attr('tabindex', '-1');
       $t.attr('tabindex', '0').trigger('focus');
   }

   switch (e.key) {
       case 'ArrowDown':
       case 'Down': // legacy
           e.preventDefault();
           focusAt((idx + 1) % $items.length);
           break;
       case 'ArrowUp':
       case 'Up': // legacy
           e.preventDefault();
           focusAt((idx - 1 + $items.length) % $items.length);
           break;
       case 'Home':
           e.preventDefault();
           focusAt(0);
           break;
       case 'End':
           e.preventDefault();
           focusAt($items.length - 1);
           break;
       case 'Tab':
           // Piège le focus dans le menu
           if (!e.shiftKey && idx === $items.length - 1) {
               e.preventDefault();
               focusAt(0);
           } else if (e.shiftKey && idx === 0) {
               e.preventDefault();
               focusAt($items.length - 1);
           }
           break;
       default:
           break;
   }
});
