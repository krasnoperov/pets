# Кабанчик

Пользовательский v2-питомец для Codex.

![Спокойная анимация Кабанчика](./preview.gif)

## Установка

Скопируйте `pet.json` и `spritesheet.webp` в папку:

```text
~/.codex/pets/kabanchik/
```

Готовая команда для macOS и Linux:

```bash
mkdir -p "$HOME/.codex/pets/kabanchik"
curl -L https://raw.githubusercontent.com/krasnoperov/pets/main/kabanchik/pet.json \
  -o "$HOME/.codex/pets/kabanchik/pet.json"
curl -L https://raw.githubusercontent.com/krasnoperov/pets/main/kabanchik/spritesheet.webp \
  -o "$HOME/.codex/pets/kabanchik/spritesheet.webp"
```

После установки перезапустите приложение и выберите Кабанчика в настройках питомцев.

## Состав пакета

- `pet.json` — описание питомца и версия формата.
- `spritesheet.webp` — v2-атлас размером `1536×2288`.
- `preview.gif` — превью спокойной анимации.
- `contact-sheet.png` — все стандартные и направленные состояния.
- `validation.json` — результат детерминированной проверки атласа.
