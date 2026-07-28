# Bat Storykeeper

Пользовательский v2-питомец для Codex: летучая мышь LearnSpeakRepeat с открытой книгой. В этой финальной версии нет фонаря, а прыжок собран как цельная дуга без уменьшения персонажа и прыганья сидя.

![Спокойная анимация Bat Storykeeper](./preview.gif)

## Установка

macOS и Linux:

```bash
mkdir -p "$HOME/.codex/pets/bat-storykeeper"
curl -L https://raw.githubusercontent.com/krasnoperov/pets/main/bat-storykeeper/pet.json \
  -o "$HOME/.codex/pets/bat-storykeeper/pet.json"
curl -L https://raw.githubusercontent.com/krasnoperov/pets/main/bat-storykeeper/spritesheet.webp \
  -o "$HOME/.codex/pets/bat-storykeeper/spritesheet.webp"
```

После установки перезапустите Codex и выберите Bat Storykeeper в настройках питомцев.

## Состав пакета

- `pet.json` — описание питомца и версия формата.
- `spritesheet.webp` — v2-атлас размером `1536×2288`.
- `preview.gif` — превью спокойной анимации.
- `contact-sheet.png` — все стандартные и направленные состояния.
- `validation.json` — результат детерминированной проверки атласа.
