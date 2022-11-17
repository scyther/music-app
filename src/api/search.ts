import axios from 'axios'
import { hint } from '../pages/Search';

const autoComplete = async (term: string) => {
    let updatedHints = []
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/auto-complete',
        params: { term: term, locale: 'en-US' },
        headers: {
            'X-RapidAPI-Key': 'bb4173c120msh87cb799569535a3p148898jsnc54327087f5d',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };


    const res = await axios.request(options)
    updatedHints = res?.data?.hints?.map((hint: hint, index: number) => ({ ...hint, id: index }))
    return updatedHints
}

const search = async (term: string) => {
    let tracks = []
    let artists = []
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: { term: term, locale: 'en-US', offset: '0', limit: '5' },
        headers: {
            'X-RapidAPI-Key': 'bb4173c120msh87cb799569535a3p148898jsnc54327087f5d',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    const res = await axios.request(options)

    tracks = res.data.tracks.hits
    artists = res.data.artists.hints
    return { tracks, artists }

}

export { autoComplete, search }