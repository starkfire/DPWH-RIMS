<template>
    <div id="container">
        <el-row>
            <el-col>
                <div id="map" style="width: 100%; height: 650px;"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// DeckGL
import { Deck } from '@deck.gl/core'
import { ScatterplotLayer } from '@deck.gl/layers'

// Mapbox
import { MapboxLayer } from '@deck.gl/mapbox'
import mapboxgl from 'mapbox-gl'

// Access Token
mapboxgl.accessToken = 'ADD_TOKEN'

export default {
    name: 'deck',
    data(){
        return {
            deck: null
        }
    },
    mounted(){
        const INITIAL_VIEW_STATE = {
            latitude: 13.838987,
            longitude: 121.977574,
            zoom: 15
        }

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
            zoom: INITIAL_VIEW_STATE.zoom
        })

        map.addControl(new mapboxgl.FullscreenControl())

        const newLayer = new MapboxLayer({
            id: 'banners',
            type: ScatterplotLayer,
            data: fetch('http://localhost:3000/api/potholes').then(res => res.json()),
            getPosition: d => [d.location[1], d.location[0]],
            getRadius: 3,
            getFillColor: [80, 220, 100],
            radiusMinPixels: 2
        })
        
        map.on('load', () => {
            map.addLayer(newLayer)
        })
    }
}
</script>