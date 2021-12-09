const initState = {
    league: [
        { name: 'UCL',id:2},
        { name: 'Europa',id:3},
        { name: 'EPL', id: 39},
        { name: 'Laliga', id: 140},
        { name: 'Serie A', id: 135},
        { name: 'Bundesliga', id: 78},
        { name: 'Ligue 1', id: 61},
        { name: 'Eredivisie', id: 88},
        { name: 'Primera Liga', id: 94},
    ]
};

const leagueReducer = (state = initState, action)=> {
    return state;
}

export default leagueReducer;