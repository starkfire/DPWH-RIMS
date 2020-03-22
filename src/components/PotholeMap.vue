<template>
    <div class="pothole-map">
        <div id="map" style="width: 100%; height: 600px;"></div>
    </div>
</template>
<script>
import { Deck } from '@deck.gl/core'
import { ScatterplotLayer } from '@deck.gl/layers'

import { MapboxLayer } from '@deck.gl/mapbox'
import mapboxgl from 'mapbox-gl'

import * as axios from 'axios'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

export default {
    name: 'PotholeMap',
    data() {
        return {
            deck: null,
            data: {},
            locations: {}
        }
    },
    created() {
        this.data = this.fetchData()
    },
    mounted() {
        const INITIAL_VIEW_STATE = {
            latitude: 13.5952,
            longitude: 122.3230,
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
            id: 'potholes',
            type: ScatterplotLayer,
            data: fetch('http://localhost:3000/api/pothole').then(res => res.json()),
            getPosition: d => [d.location[1], d.location[0]],
            getRadius: 10,
            getFillColor: [219, 26, 36],
            radiusMinPixels: 10
        })

        map.on('load', () => {
            map.addLayer(newLayer)
        })
    },
}
</script>