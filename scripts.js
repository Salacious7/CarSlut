let apiMain = "https://anapioficeandfire.com/api/"
let input = document.getElementById('search-input')
let select = document.getElementById('search-dropdown')
let list = document.getElementById('list')

let houseMap = new Map()
houseMap.set('greyjoy', ['theon', 'balon', 'euron', 'yara'] )
houseMap.set('lannister', ['jaime', 'cersei', 'tyrion', 'tywin', 'kevan'] )
houseMap.set('baratheon', ['renly', 'stannis', 'robert', 'joffrey', 'tommen'] )
houseMap.set('targaryen', ['daenerys', 'viserys', 'aegon', 'rhaegar'] )
houseMap.set('frey', ['walder'] )
houseMap.set('martell', ['oberyn'] )
houseMap.set('arryn', ['jon', 'lysa'] )
houseMap.set('tully', ['edmure', 'hoster'] )
houseMap.set('bolton', ['roose'] )
houseMap.set('stark', ['arya', 'sansa', 'eddard', 'catelyn'] )
houseMap.set('snow', ['ramsay', 'jon'] )
console.log(houseMap)

function Search()
{
    if(input.value == '') return

    
    let category = select.options[select.selectedIndex].value;

    if(category == 'characters')
        GenerateQuery(category)
    // else if(category == 'houses')
    //     SearchByHouse(category)
}

function GenerateQuery(searchCategory)
{
    let fetchUrl = apiMain

    let query = input.value
    query = query.trim()

    fetchUrl += searchCategory + '/?name=' + query.split(/\s+/).join('+')
    
    SearchApi(fetchUrl)
    
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

function SearchByHouse(searchCategory)
{
    let fetchUrl = apiMain

    let query = input.value
    query = query.trim()

    fetchUrl += searchCategory + '/?name=' + query.split(/\s+/).join('+')
    
    fetch(fetchUrl)
        .then(response => response.json())
        .then(out => DisplayHouseInfo(out[0]))
        .catch(err => console.error(err))
}

function DisplayCharacterInfo(data)
{
    if(data == null) return

    list.innerHTML = ''

    list.innerHTML +=
    `${data.name}<br>
    <label>Also known as: </label><span>${data.aliases}</span><br>
    <label>Titles held: </label><span>${data.titles}</span><br>
    <label>Culture: </label><span>${data.culture}</span><br>
    <label>Played by: </label><span>${data.playedBy}</span>`
}

function IsFirstName(name)
{
    return [...houseMap].find(([key, val]) => val == name)[0]
}