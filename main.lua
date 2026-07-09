print("Hello SeiHub!")
local Scripts = {
    [79546208627805] = "https://rawcdn.githack.com/ffyt22487-gif/Main-Script/b904d7f19ce1a6ccb4647b16a1383453b6b50aea/99_Nights_in_the_Forest.txt",
    [126371807511901] = "https://rawcdn.githack.com/ffyt22487-gif/Main-Script/b904d7f19ce1a6ccb4647b16a1383453b6b50aea/99_Nights_in_the_Forest.txt",
    [126509999114328] = "https://rawcdn.githack.com/ffyt22487-gif/Main-Script/b904d7f19ce1a6ccb4647b16a1383453b6b50aea/99_Nights_in_the_Forest.txt",
    [113533413485661] = "https://raw.githubusercontent.com/ffyt22487-gif/Main-Script/main/Zombie_Tycoon.txt"
}

local URL = Scripts[game.PlaceId]
if URL then
    loadstring(game:HttpGet(URL))()
end
