/* Copyright.

 */
import Vue from 'vue'
import Vuex from 'vuex'
import { isPending } from 'q';

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //存放的键值对就是所要管理的状态
        playing: false,
        duration: {},
        currentTime: 0,
        songId: {},
        songName: {},
        songUrl: '',
        songImg: '',
        songArtist: {},
        showAplayer: true
    },
    mutations: {
        setSongName(state, name) {
            state.songName = name
        },
        setDuration(state, duration) {
            state.duration = duration
        },
        setCurrentTime(state, currentTime) {
            state.currentTime = currentTime
        },
        setSongId(state, id) {

            state.songId = id
        },
        setSongUrl(state, songUrl) {
            state.songUrl = songUrl
        },
        setSongImg(state, songImg) {
            state.songImg = songImg
        },
        setSongImg(state, songImg) {
            state.songImg = songImg
        },
        setSongArtist(state, songArtist) {
            state.songArtist = songArtist
        },
        setPlaying(state, playing) {
            state.playing = playing
        },
        setShowAplayer(state, showAplayer) {
            state.showAplayer = showAplayer
        },


    },
    actions: {
        setSongNameActions(context, name) {
            context.commit('setSongName', name)
        },
        setDurationActions(context, duration) {
            context.commit('setDuration', duration)
        },
        setCurrentTimeActions(context, setCurrentTime) {
            context.commit('setCurrentTime', setCurrentTime)
        },
        setSongIdActions(context, setSongId) {
            context.commit('setSongId', setSongId)
        },
        setSongUrlActions(context, setSongUrl) {
            context.commit('setSongUrl', setSongUrl)
        },
        setSongImgActions(context, setSongImg) {
            context.commit('setSongImg', setSongImg)
        },
        setSongArtistActions(context, songArtist) {
            context.commit('setSongArtist', songArtist)
        },
        setPlayingActions(context, setPlaying) {
            context.commit('setPlaying', setPlaying)
        },
        setShowAplayerActions(context, setShowAplayer) {
            context.commit('setShowAplayer', setShowAplayer)
        },


    }
})

export default store