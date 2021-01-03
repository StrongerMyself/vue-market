import { ActionContext } from 'vuex-types'
import { Product } from 'entity-types'
import { fetchList } from '@/services/products'
import { FETCH_STATUS } from '@/constants/fetch-status'

type State = {
  list: Product[]
  errorText: string
  fetchStatus: keyof typeof FETCH_STATUS
}

type Context = ActionContext<'catalog'>

const state = (): State => ({ 
  list: [],
  errorText: '',
  fetchStatus: FETCH_STATUS.NOT_ASKED,
})

const mutations = {
  loading(state: State) {
    state.fetchStatus = FETCH_STATUS.LOADING
  },
  loaded(state: State, payload: Product[]) {
    state.list = payload
    state.fetchStatus = FETCH_STATUS.LOADED
  },
  failed(state: State, payload: string) {
    state.errorText = payload
    state.fetchStatus = FETCH_STATUS.FAILED
  }
}

const actions = {
  async fetchList(context: Context) {
    const { commit } = context
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

const getters = {
  isLoading(state: State) {
    return state.fetchStatus === FETCH_STATUS.LOADING
  },
  isLoaded(state: State) {
    return state.fetchStatus === FETCH_STATUS.LOADED
  },
  isError(state: State) {
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
