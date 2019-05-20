import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import './index.less'

function Weather({ city, icon, dateTime, temperature, name, loading }) {

    return (
        <Spin spinning={false}>
            <div className={"weather"}>
                <div className={"left"}>
                    <div
                        className={"icon"}
                        style={{
                            backgroundImage: `url(${icon})`,
                        }}
                    />
                    <p>{name}</p>
                </div>
                <div className={"right"}>
                    <h1 className={"temperature"}>{`${temperature}°`}</h1>
                    <p className={"description"}>
                        {city},{dateTime}
                    </p>
                </div>
            </div>
        </Spin>
    )
}

Weather.propTypes = {
    city: PropTypes.string,
    icon: PropTypes.string,
    dateTime: PropTypes.string,
    temperature: PropTypes.string,
    name: PropTypes.string,
    loading: PropTypes.bool,
}

export default Weather
