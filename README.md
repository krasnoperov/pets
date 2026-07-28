# Pets for Codex

Коллекция пользовательских питомцев для Codex.

## Доступные маскоты

### [Кабанчик](./kabanchik)

Канонический интернет-кабанчик: мечется, прыгает, кивает и обкашливает вопросики.

![Кабанчик](./kabanchik/preview.gif)

## Быстрая установка

macOS и Linux:

```bash
mkdir -p "$HOME/.codex/pets/kabanchik"
curl -L https://raw.githubusercontent.com/krasnoperov/pets/main/kabanchik/pet.json \
  -o "$HOME/.codex/pets/kabanchik/pet.json"
curl -L https://raw.githubusercontent.com/krasnoperov/pets/main/kabanchik/spritesheet.webp \
  -o "$HOME/.codex/pets/kabanchik/spritesheet.webp"
```

Windows PowerShell:

```powershell
$pet = "$env:USERPROFILE\.codex\pets\kabanchik"
New-Item -ItemType Directory -Force -Path $pet | Out-Null
Invoke-WebRequest https://raw.githubusercontent.com/krasnoperov/pets/main/kabanchik/pet.json -OutFile "$pet\pet.json"
Invoke-WebRequest https://raw.githubusercontent.com/krasnoperov/pets/main/kabanchik/spritesheet.webp -OutFile "$pet\spritesheet.webp"
```

После установки перезапустите приложение и выберите Кабанчика в настройках питомцев.

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
