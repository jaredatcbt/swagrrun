export default async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    return myText;
}