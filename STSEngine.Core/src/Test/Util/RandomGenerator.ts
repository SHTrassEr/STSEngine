function getRandomString(stringLength: number = 20): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";

    for (var i = 0; i < stringLength; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function getRandomInt(max: number = 1000000, min: number = -1000000): number
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntArray(count: number = 20, max: number = 1000000, min: number = -1000000): number[] {
    var arr: number[] = [];
    for (var i = 0; i < count; i++) {
        arr.push(getRandomInt(max, min));
    }

    return arr;
}


function getRandomStringArray(count: number = 20, stringLength: number = 20): string[] {
    var arr: string[] = [];
    for (var i = 0; i < count; i++) {
        arr.push(getRandomString(stringLength));
    }

    return arr;
}

