# default filename footage search

<div id="default-filename-widget"></div>

<div class="mw6 center tl mb4">

this is a tool that generates random camera default filenames — the ones cameras assign automatically, like `DSC_0001` or `IMG_0042` — and searches YouTube for them.

the goal is to find raw, unedited footage — the kind that gets uploaded straight from the camera without ever being renamed.

it pulls from the [DCF standard](https://en.wikipedia.org/wiki/Design_rule_for_Camera_File_system) and covers naming patterns from Canon, Sony, Nikon, GoPro, dashcams, phones, and more.

there's also a chance of hitting folder-path style searches like `100APPLE` or `WhatsApp Video`.

watching and sampling found footage is a practice as old as time, but I was personally inspired by Everest Pipkin's [default filename tv](https://everest-pipkin.com/#projects/defaultfilename.html) and Lee Tusman's [Cinema of Unknown Youtube](https://leetusman.com/).

</div>

---

<div class="mw6 center tl mb4">

### let's get into DCF naming

the [Design rule for Camera File system](https://en.wikipedia.org/wiki/Design_rule_for_Camera_File_system) (DCF) is a standard from [JEITA](https://en.wikipedia.org/wiki/Japan_Electronics_and_Information_Technology_Industries_Association) that nearly every digital camera follows.

it defines how files and folders are named on the memory card so that any device can read any card.

**filenames** are 8 characters: a 4-character prefix chosen by the manufacturer, then a 4-digit number that increments with each shot.

prefixes are typically set by the manufacturer — Canon uses `IMG_`, Fujifilm uses `DSCF`, Nikon compacts use `DSCN`, GoPro uses `GOPR`, and so on.

videos follow the same pattern: Canon labels them `MVI_`, QuickTime-based cameras use `MOV_`.

**folders** live under a root `DCIM/` directory.

each folder is named with a 3-digit number (100–999) followed by 5 alphanumeric characters that identify the camera.

so an iPhone stores photos in `DCIM/100APPLE/`, a Canon in `DCIM/100CANON/`, a Nikon D750 in `DCIM/100ND750/`.

when a folder fills up (typically at 9999 files), the camera rolls over to `101APPLE/`, `102APPLE/`, etc.

some common prefixes:

| prefix | source |
|--------|--------|
| `DSC_` | generic DCF (many manufacturers) |
| `IMG_` | Canon, iPhone, Android |
| `DSCF` | Fujifilm |
| `DSCN` | Nikon compact |
| `GOPR` | GoPro |
| `MVI_` | Canon video |
| `MOV_` | QuickTime video |
| `P` + 7 digits | Panasonic |
| `VID_` | generic video / Samsung |

phones and apps add their own conventions on top.

Android timestamps files like `VID_20240315_143022`, WhatsApp dumps received videos into `WhatsApp/Media/WhatsApp Video/`, dashcams use folders like `CARDV/` or `Normal Video/`.

you learn new things every day!!

</div>
