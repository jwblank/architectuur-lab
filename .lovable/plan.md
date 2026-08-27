# Plan: AI Propositie Lab — technische afwerking

## Doel
De applicatie is functioneel compleet. Dit plan pakt de laatste technische en UX-oneffenheden aan zodat het product stabieler, vloeiender en volledig Nederlands is.

## 1. Volledige Nederlandse interface
- Wijzig `<html lang="en">` naar `lang="nl"` in `src/routes/__root.tsx`.
- Vertaal de 404- en foutpagina's in `__root.tsx` naar het Nederlands ("Pagina niet gevonden", "Terug naar het lab").

## 2. Behoud gegenereerde ideeën bij tabwissel
- Verhuis `ideeen`-state van `InspirationPanel` naar `Index` in `src/routes/index.tsx`.
- Geef `ideeen` en `setIdeeen` door aan `InspirationPanel`.
- Hierdoor blijven AI-ideeën staan als de gebruiker wisselt tussen Inspiratie, Analyse en Favorieten.

## 3. Betrouwbaardere AI-gateway-aanroep
- Wijzig model in `src/lib/inspiration.functions.ts` van `google/gemini-3-flash-preview` naar `google/gemini-3.7-flash` (default, breder toegestaan).
- Behoud de bestaande foutafhandeling voor 429, 402 en overige statuscodes.
- Test de aanroep end-to-end met een representatieve combinatie.

## 4. Stabiliteit van UI-state
- Geef gegenereerde ideeën een stabiele `id` (bijv. `crypto.randomUUID()` of `Date.now()` + index) in plaats van `idee.titel-i` als React-key.
- Idem voor bouwsteen-tags binnen een idee.

## 5. Betere library-scroll en hints
- Maak categorie-headers in `PieceLibrary` sticky zodat ze zichtbaar blijven tijdens scrollen.
- Pas de hint in `InspirationPanel` aan naar "Combineer 3 of meer bouwstenen voor de beste ideeën" en wijzig `tooFew` naar `< 3`.

## 6. Verificatie
- `bunx tsc --noEmit` moet zonder fouten slagen.
- Playwright-test: plaats een combinatie, klik "Genereer 3 ideeën", controleer dat er 3 kaarten verschijnen en geen consolefouten optreden.

## Resultaat
Een volledig Nederlandse, stabiele inspiratietool waarbij ideeën niet verdwijnen bij tabwissels, de AI-gateway betrouwbaar antwoordt en de interface net wat vloeiender aanvoelt.

Scope: alleen frontend/server-function wijzigingen; geen backend/cloud-wijzigingen nodig.
