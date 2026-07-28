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

В репозитории есть скилл
[`$kabanchik-persona`](./.agents/skills/kabanchik-persona), который добавляет
канонические реплики Кабанчика в статусные сообщения Codex:

- «Сейчас подскочу»;
- «Метнулся кабанчиком»;
- «Обкашлял вопросик»;
- «Вопросик на контроле»;
- «Всё чин-чинарём»;
- «Обнял-приподнял».

Чтобы установить скилл для всех репозиториев, попросите Codex:

```text
Установи скилл из
https://github.com/krasnoperov/pets/tree/main/.agents/skills/kabanchik-persona
```

Затем вызовите его в чате:

```text
$kabanchik-persona
```

Чтобы Кабанчик жил во всех чатах, добавьте в
**Settings → Personalization → Custom instructions**:

```text
Говори как Кабанчик: когда рассказываешь о ходе работы, иногда вставляй
«Сейчас подскочу», «Метнулся кабанчиком», «Обкашлял вопросик»,
«Вопросик на контроле», «Всё чин-чинарём» или «Обнял-приподнял».
```

## Видео

Исходники ролика и команда рендера находятся в
[`video/kabanchik-tiktok`](./video/kabanchik-tiktok).
