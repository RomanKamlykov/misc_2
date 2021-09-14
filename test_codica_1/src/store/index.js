// @ts-check
import { createStore } from 'vuex'
import * as fn from './functions'
import * as mt from './mutation-types'

export default createStore ({
  state() {
    return {
      currentLocation: [],
      savedLocations: [],
      detailsLocation: {},
      detailsHourlyForecast: [],
      lang: '',
      message: '',
    }
  },
  mutations: {
    [mt.CURRENT_LOCATION_SET] (state, payload) {
      state.currentLocation = [ payload.weather ] // >> []
    },
    [mt.SAVED_LOCATIONS_ADD_ONE] (state, payload) {
      state.savedLocations = [ ...state.savedLocations, payload.weather ] // >> []
    },
    [mt.SAVED_LOCATIONS_UPDATE_ONE] (state, payload) {
      state.savedLocations = state.savedLocations.map(el => {
        if (el.id === payload.weather.id) return payload.weather
        return el
      }) // >> []
    },
    [mt.SAVED_LOCATIONS_REMOVE_ONE_BY_ID] (state, payload) {
      state.savedLocations = state.savedLocations.filter(el => el.id !== payload.locationId) // >> []
    },
    [mt.DETAILS_SET_LOCATION] (state, payload) {
      state.detailsLocation = { ...payload.weather } // >> []
    },
    [mt.DETAILS_SET_HOURLY_FORECAST] (state, payload) {
      state.detailsHourlyForecast = [ ...payload.weather.hourly ] // >> {}
    },
    [mt.SET_LANG] (state, payload) {
      state.lang = payload.lang // >> string
    },
    [mt.SET_A_MESSAGE] (state, payload) {
      state.message = payload.error // >> string
    },
  },
  actions: {
    async add_a_location_by_name({ commit, state }, { name }) {
      try {
        const [weather, error] = await fn.getCurrentWeatherByCityName({ name, lang: state.lang })
        if (error) { throw error }
        if (state.savedLocations.some(el => el.id === weather.id)) { throw `${weather.name}, ${weather.sys.country} is already added!` }
        commit(mt.SAVED_LOCATIONS_ADD_ONE, { weather })

        // save to cookie
        const locationIDs = state.savedLocations.map(el => el.id) // >> [1,2,3]
        document.cookie = `locationIDs=${locationIDs.join(',')};SameSite=None;Secure`
      } catch (error) {
        commit(mt.SET_A_MESSAGE, { error })
      }
    },
    async remove_a_location_by_id({ commit, state }, { locationId }) {
      commit(mt.SAVED_LOCATIONS_REMOVE_ONE_BY_ID, { locationId })

      // save to cookie
      const locationIDs = state.savedLocations.map(el => el.id) // >> [1,2,3]
      document.cookie = `locationIDs=${locationIDs.join(',')};SameSite=None;Secure`
    },
    change_the_language({ commit }, { lang }) {
      commit(mt.SET_LANG, { lang })

      // save to cookie
      document.cookie = `lang=${lang};SameSite=None;Secure`
    },
    set_the_language({ commit }) {
      // parse cookie
      const cookieObj = document.cookie ? fn.parseCookie(document.cookie) : {}

      // set the language
      const lang = cookieObj.lang || "EN"
      commit(mt.SET_LANG, { lang })
    },
    get_current_location_by_coordinates({ commit, state }) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const [weather, error] = await fn.getCurrentWeatherByGeographicCoordinates({ latitude, longitude, lang: state.lang })
          if (error) { throw error }
          commit(mt.CURRENT_LOCATION_SET, { weather })
        } catch (error) {
          commit(mt.SET_A_MESSAGE, { error })
        }
      })
    },
    get_saved_locations({ commit, state }) {
      // parse cookie
      const cookieObj = document.cookie ? fn.parseCookie(document.cookie) : {}
      
      // set locations
      if (cookieObj.locationIDs) {
        cookieObj.locationIDs.split(',').forEach(async (locationId) => {
          try {
            const [weather, error] = await fn.getCurrentWeatherByCityId({ locationId, lang: state.lang })
            if (error) { throw error }
            commit(mt.SAVED_LOCATIONS_ADD_ONE, { weather })
          } catch (error) {
            commit(mt.SET_A_MESSAGE, { error })
          }
        })
      }
    },
    async update_the_weather({ commit, state }, { locationId }) {
      try {
        const [weather, error] = await fn.updateTheWeather({ locationId, lang: state.lang })
        if (error) { throw error }
        commit(mt.SAVED_LOCATIONS_UPDATE_ONE, { weather })
      } catch (error) {
        commit(mt.SET_A_MESSAGE, { error })
      }
      // try {
      //   const response = await fetch(`/.netlify/functions/getCurrentWeatherByCityId?locationId=${locationId}&lang=${lang}`)
      //   if (!response.ok) { throw response.statusText }

      //   const { weather } = await response.json()
      //   commit(mt.SAVED_LOCATIONS_UPDATE_ONE, { weather })
      // } catch (error) {
      //   commit(mt.SET_A_MESSAGE, { error })
      // }
    },
    async get_hourly_forecast({ dispatch, commit, state }, { locationId }) {
      await dispatch('get_location_by_id', { locationId })
      try {
        const [weather, error] = await fn.getHourlyForecastByGeographicCoordinates({
          latitude: state.detailsLocation.coord.lat,
          longitude: state.detailsLocation.coord.lon,
          lang: state.lang,
        })
        if (error) { throw error }
        commit(mt.DETAILS_SET_HOURLY_FORECAST, { weather })
      } catch (error) {
        commit(mt.SET_A_MESSAGE, { error })
      }
    },
    async get_location_by_id({ commit, state }, { locationId }) {
      try {
        const [weather, error] = await fn.getCurrentWeatherByCityId({ locationId, lang: state.lang })
        if (error) { throw error }
        commit(mt.DETAILS_SET_LOCATION, { weather })
      } catch (error) {
        commit(mt.SET_A_MESSAGE, { error })
      }
    },
  },
  modules: {
  },
})
