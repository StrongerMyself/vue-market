import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Product } from 'entity-types'
import { fetchList } from '@/services/products'
import { FETCH_STATUS } from '@/constants/fetch-status'

export type State = {
  list: Product[]
  errorText: string
  fetchStatus: keyof typeof FETCH_STATUS
}

const state = (): State => ({ 
  list: [],
  errorText: '',
  fetchStatus: FETCH_STATUS.NOT_ASKED,
})

const mutations: MutationTree<State> = {
  loading(state) {
    state.fetchStatus = FETCH_STATUS.LOADING
  },
  loaded(state, payload: Product[]) {
    state.list = payload
    state.fetchStatus = FETCH_STATUS.LOADED
  },
  failed(state, payload: string){
    state.errorText = payload
    state.fetchStatus = FETCH_STATUS.FAILED
  }
}

const actions: ActionTree<State, {}> = {
  async fetchList({ commit }) {
    commit('loading')
    fetchList()
      .then(list => {
        commit('loaded', list)
      })
      .catch(errorText => {
        commit('failed', errorText)
      })
  }
}

const getters: GetterTree<State, {}> = {
  isLoading(state) {
    return state.fetchStatus === FETCH_STATUS.LOADING
  },
  isLoaded(state) {
    return state.fetchStatus === FETCH_STATUS.LOADED
  },
  isError(state) {
    return state.fetchStatus === FETCH_STATUS.FAILED
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
