let apiMain = "https://anapioficeandfire.com/api/"
let input = document.getElementById('search-input')
let select = document.getElementById('search-dropdown')
let result = document.getElementById('result')
let test = ''
function Search()
{
    if(input.value == '') return

    let fetchUrl = apiMain
    let category = select.options[select.selectedIndex].value;
    let query = input.value
    query = query.trim()

    fetchUrl += category + '/?name=' + query.split(/\s+/).join('+')
    
    fetch(fetchUrl)
        .then(response => response.json())
        .then(out =>
        {
            console.log(out[0])
            DisplayResponse(out[0])
        })   
        .catch(err => console.error(err))
}

function DisplayResponse(data)
{
    if(data == null) return

    result.innerHTML = ''

    result.innerHTML += `
    ${data.name}<br>
    Also known as: ${data.aliases}<br>
    Titles held: ${data.titles}<br>
    Culture: ${data.culture}<br>
    Played by: ${data.playedBy} `
}