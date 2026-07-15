# DopaminDrive

Gamifizierte Anti-Prokrastinations-App: Aufgaben erledigen, Token sammeln, Belohnungsziele einlösen. Mit Wochenplan, Statistik, Streak und „Pills" als mentale Starthilfen.

## Nutzung

Single-File-App — einfach `index.html` über einen Webserver aufrufen. Alle Daten bleiben lokal im Browser (LocalStorage), nichts verlässt das Gerät.

**Als App installieren (PWA):** Die Seite über HTTPS öffnen (z. B. GitHub Pages), dann:

- **iPhone/iPad:** Safari → Teilen-Symbol → „Zum Home-Bildschirm"
- **Android:** Chrome → Menü → „App installieren"
- **Desktop:** Chrome/Edge → Installieren-Symbol in der Adressleiste

Danach läuft die App offline und mit eigenem Icon wie eine native App.

## Datensicherung

- Automatisches rollierendes Backup der letzten 7 Tage im Browser (Einstellungen → „Backup wiederherstellen")
- Regelmäßig **Einstellungen → JSON exportieren** nutzen — LocalStorage kann vom Browser gelöscht werden (iOS: nach 7 Tagen Safari-Nichtnutzung!)

## Entwicklung

Kein Build nötig. Lokal testen: `python3 -m http.server 8741` im Projektordner, dann `http://localhost:8741` öffnen. Nach Änderungen an `index.html` die Cache-Version in `sw.js` hochzählen (`dopamindrive-v1` → `-v2`), damit installierte Apps das Update bekommen.
