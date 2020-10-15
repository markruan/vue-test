/* Copyright.

 */
import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //存放的键值对就是所要管理的状态
        playing: false,
        fullScreen: false,
        playList: [],
        currentIndex: -1,
        favoriteList: [],
        playHistory: [],
        audioList: []
    },
    mutations: {
        getGeList(state, list) {

            state.playHistory = list
        },
        addSongToHistory(state, info) {

            const data = state.playHistory
           
            const result = data.some(item => {
              
                if (item.id == info.id) {
                    return true
                }
            })
            console.log(result)
            if (!result) {
                data.push(info)
            }

        },
        setPlayList(state, list) {
            state.playList = list
        },
        addAudioList(state, url) {
            console.log(url)
            state.audioList.push(url)
        }
    },
    actions: {
        getGeListActions(context, list) {
            context.commit('getGeList', list)

        },
        addAudioListActions(context, url) {
            context.commit('addAudioList', url)
        },
        setPlayListActions(context, list) {
            context.commit('setPlayList', list)
        }

    }
})

export default store