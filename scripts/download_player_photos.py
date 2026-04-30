#!/usr/bin/env python3
"""
Download Instagram profile pictures for World 48 players.

HOW TO RUN:
  1. Open PowerShell in the project folder
  2. pip install instaloader
  3. python scripts/download_player_photos.py

Photos are saved to public/Players/ with the correct slug filename.
Existing photos are skipped automatically.
"""

import os
import re
import instaloader
from pathlib import Path

OUTPUT_FOLDER = Path("public/Players")
OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

# Player name → Instagram handle
# Name must match exactly what's in the Google Sheet (used to generate the filename slug)
PLAYERS = {
    "Darragh Horkan":              "darragh.horkan",
    "Jack Fitzpatrick":            "Jack_Fitzpatrick2007",
    "Aivaras Buzas":               "aivaras_buzas",
    "Adam Charles":                "Adamcharles07_",
    "Markas Mikalickas":           "lth.markas",
    "Mykyta Hural":                "eastmanoid",
    "Wilfred Omorusi":             "Ogosah_08",
    "Zahir Gutierrez":             "zahir.gutierrez4",
    "Joseph Badejo":               "josephbadejoo",
    "Jakub Ofman":                 "j_ofman",
    "Viktor Dimitrov":             "iiamdimso",
    "Frank Nasasa Karlsson":       "franknasasakarlsson",
    "Fryderyk Klimas":             "fred_klimas",
    "Colin Schroeder":             "28.colin",
    "Aidan Leacy":                 "aidan.leacy",
    "Rokas Liucvaikis":            "rokas_liucvaikis",
    "Nektarios Papadopoulos":      "Nektariospap",
    "Maurice Barnard":             "maurice_.b11",
    "Til Peters":                  "tp_9904",
    "Zach Trezvant":               "zachtrezvant",
    "Ayo Ibirinde":                "ayo.ibr",
    "Harry Sheehan":               "harry_sheehan7",
    "Magnas Butkus":               "magnas_butkus",
    "Nojus Vasikauskas":           "nojusvasikauskas",
    "Juraj Minarovjech":           "_minarovjech",
}


def slugify(name: str) -> str:
    """Convert player name to filename slug (matches the website's logic)."""
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = slug.strip("-")
    return slug


def main():
    L = instaloader.Instaloader(
        download_pictures=True,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        quiet=True,
    )

    downloaded = 0
    skipped = 0
    failed = 0

    print(f"\n World 48 — Downloading player profile pictures\n{'─'*50}")

    for player_name, ig_handle in PLAYERS.items():
        slug = slugify(player_name)
        out_path = OUTPUT_FOLDER / f"{slug}.jpg"

        if out_path.exists():
            print(f"  ⏭  {player_name} — already exists, skipping")
            skipped += 1
            continue

        print(f"  ↓  {player_name} (@{ig_handle})...", end=" ", flush=True)

        try:
            profile = instaloader.Profile.from_username(L.context, ig_handle)
            pic_url = profile.profile_pic_url

            import urllib.request
            urllib.request.urlretrieve(pic_url, out_path)
            print(f"✓ saved as {slug}.jpg")
            downloaded += 1

        except instaloader.exceptions.ProfileNotExistsException:
            print(f"✗ profile @{ig_handle} not found")
            failed += 1
        except Exception as e:
            print(f"✗ failed ({e})")
            failed += 1

    print(f"\n{'─'*50}")
    print(f"  Downloaded : {downloaded}")
    print(f"  Skipped    : {skipped} (already existed)")
    print(f"  Failed     : {failed}")
    print(f"\n  Photos saved to: public/Players/")

    if downloaded > 0:
        print("\n  Next step — commit and push:")
        print("    git add public/Players/")
        print('    git commit -m "Add player profile pictures from Instagram"')
        print("    git push\n")


if __name__ == "__main__":
    main()
