let input = document.getElementById('search-input')

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

// function SearchByHouse(searchCategory)
// {
//     let fetchUrl = apiMain

//     let query = input.value
//     query = query.trim()

//     fetchUrl += searchCategory + '/?name=' + query.split(/\s+/).join('+')
    
//     fetch(fetchUrl)
//         .then(response => response.json())
//         .then(out => DisplayHouseInfo(out[0]))
//         .catch(err => console.error(err))
// }

// function IsFirstName(name)
// {
//     return [...houseMap].find(([key, val]) => val == name)[0]
// }