let input = document.getElementById('search-input')
// U59i_Nfofd5eBN9oRfZu - LOTR api key
let gotCharacters = []
GetGotCharacters()
let lotrCharacers = []
GetLotrCharacters()

function Search()
{
    if(input.value == '') return
    let select = document.getElementById('search-dropdown')
    let category = select.options[select.selectedIndex].value;
    GenerateQuery(category)
}

function GenerateQuery(searchCategory)
{
    let query = input.value.trim()
    SearchApi("https://anapioficeandfire.com/api/" + searchCategory + '/?name=' + query.split(/\s+/).join('+'))
}

async function SearchApi(fetchUrl)
{
    try
    {
        let response = await fetch(fetchUrl)
        response = await response.json()
        DisplayCharacterInfo(response[0])
    } 
    catch (error)
    {
        console.error(error)
    }
}

function DisplayCharacterInfo(data)
{
    if(data == null) return
    let list = document.getElementById('list')
    list.innerHTML = ''

    list.innerHTML +=
    `${data.name}<br>
    <label>Also known as: </label><span>${data.aliases}</span><br>
    <label>Titles held: </label><span>${data.titles}</span><br>
    <label>Culture: </label><span>${data.culture}</span><br>
    <label>Played by: </label><span>${data.playedBy}</span>`
}

async function GetGotCharacters()
{
    try
    {
        let response = await fetch('https://thronesapi.com/api/v2/characters')
        response = await response.json()
        gotCharacters = response
        console.log(gotCharacters)
    }
    catch (error)
    {
        console.error(error)
    }
}

async function GetLotrCharacters()
{
    try
    {
        let response = await fetch('https://the-one-api.dev/v2/character', 
        {
            headers: new Headers({
                'Authorization': "Bearer U59i_Nfofd5eBN9oRfZu"
            })
        })
        response = await response.json()
        lotrCharacers = response
        console.log(lotrCharacers)
    }
    catch (error)
    {
        console.error(error)
    }
}