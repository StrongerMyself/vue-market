declare module 'vuex-types' {

  type RecordReturnType<K extends string, T> = {
    [P in K]: ReturnType<T[K]>
  }

  type ModuleKeys = keyof Modules
  type Mutations<M extends ModuleKeys> = Modules[M]['mutations']
  type Actions<M extends ModuleKeys> = Modules[M]['actions']
  type State<M extends ModuleKeys> = ReturnType<Modules[M]['state']>
  type Getters<M extends ModuleKeys> = RecordReturnType<
    keyof Modules[M]['getters'],
    Modules[M]['getters']
  >

  export interface ActionContext<M extends ModuleKeys> {
    dispatch: <
      K extends keyof Actions<M>,
      P extends Parameters<Actions<M>[K]>[1]
    >(
      ...arg: (P extends undefined ? [K] : [K, P])
    ) => ReturnType<Actions<M>[K]>;
    commit: <
      K extends keyof Mutations<M>,
      P extends Parameters<Mutations<M>[K]>[1]
    >(
      ...arg: (P extends undefined ? [K] : [K, P])
    ) => ReturnType<Mutations<M>[K]>;
    state: State<M>;
    getters: Getters<M>;
    rootState: any;
    rootGetters: any;
  }

}
