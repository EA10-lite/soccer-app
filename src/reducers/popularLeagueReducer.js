const initState = {
    league : [
        { name: 'Champions League',id:2},
        { name: 'Europa League',id:3},
        { name: 'Premier League', id: 39},
        { name: 'Laliga', id: 140},
        { name: 'Serie A', id: 135},
        { name: 'Bundesliga', id: 78},
        { name: 'Ligue 1', id: 61},
        { name: 'Eredivisie', id: 88},
        { name: 'Primera Liga', id: 94},
    ]
};

const popularLeagueReducer = (state = initState, action)=> {
    return state
}

export default popularLeagueReducer;
