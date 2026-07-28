# Pets for Codex

Коллекция пользовательских питомцев для Codex.

## Доступные маскоты

### [Кабанчик](./kabanchik)

Канонический интернет-кабанчик: мечется, прыгает, кивает и обкашливает вопросики.

![Кабанчик](./kabanchik/preview.gif)

### [Bat Listener](./bat-listener)

Весёлый слушатель LearnSpeakRepeat в наушниках, который делает заметки, пока Codex работает.

![Bat Listener](./bat-listener/preview.gif)

### [Bat Storykeeper](./bat-storykeeper)

Тёплый хранитель историй LearnSpeakRepeat с открытой книгой.

![Bat Storykeeper](./bat-storykeeper/preview.gif)

## Быстрая установка

Замените `<pet-id>` на `kabanchik`, `bat-listener` или `bat-storykeeper`.

macOS и Linux:

```bash
PET_ID="<pet-id>"
mkdir -p "$HOME/.codex/pets/$PET_ID"
curl -L "https://raw.githubusercontent.com/krasnoperov/pets/main/$PET_ID/pet.json" \
  -o "$HOME/.codex/pets/$PET_ID/pet.json"
curl -L "https://raw.githubusercontent.com/krasnoperov/pets/main/$PET_ID/spritesheet.webp" \
  -o "$HOME/.codex/pets/$PET_ID/spritesheet.webp"
```

Windows PowerShell:

```powershell
$petId = "<pet-id>"
$pet = "$env:USERPROFILE\.codex\pets\$petId"
New-Item -ItemType Directory -Force -Path $pet | Out-Null
Invoke-WebRequest "https://raw.githubusercontent.com/krasnoperov/pets/main/$petId/pet.json" -OutFile "$pet\pet.json"
Invoke-WebRequest "https://raw.githubusercontent.com/krasnoperov/pets/main/$petId/spritesheet.webp" -OutFile "$pet\spritesheet.webp"
```

После установки перезапустите приложение и выберите питомца в настройках.

## Персоналия Кабанчика для Codex

Скилл [`$kabanchik-persona`](./.agents/skills/kabanchik-persona) добавляет
реплики Кабанчика в статусы Codex.

```text
Установи скилл из
https://github.com/krasnoperov/pets/tree/main/.agents/skills/kabanchik-persona
```

```text
$kabanchik-persona
```

## Видео

Исходники ролика и команда рендера находятся в
[`video/kabanchik-tiktok`](./video/kabanchik-tiktok).
