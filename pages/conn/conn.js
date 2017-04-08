
/**
 * 连接设备。获取数据
 */
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        deviceId: '',
        name: '',
        serviceId: '',
        services: [],
        cd20: '',
        cd01: '',
        cd02: '',
        cd03: '',
        cd04: '',
        characteristics20: null,
        characteristics01: null,
        characteristics02: null,
        characteristics03: null,
        characteristics04: null,
        result,

    },
    onLoad: function (opt) {
        var that = this;
        console.log("onLoad");
        console.log('deviceId=' + opt.deviceId);
        console.log('name=' + opt.name);
        that.setData({ deviceId: opt.deviceId });
        /**
         * 监听设备的连接状态
         */
        wx.onBLEConnectionStateChanged(function (res) {
            console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
        })
        /**
         * 连接设备
         */
        wx.createBLEConnection({
            deviceId: that.data.deviceId,
            success: function (res) {
                // success
                console.log(res);
                /**
                 * 连接成功，后开始获取设备的服务列表
                 */
                wx.getBLEDeviceServices({
                    // 这里的 deviceId 需要在上面的 getBluetoothDevices中获取
                    deviceId: that.data.deviceId,
                    success: function (res) {
                        console.log('device services:', res.services)
                        that.setData({ services: res.services });
                        console.log('device services:', that.data.services[1].uuid);
                        that.setData({ serviceId: that.data.services[1].uuid });
                        console.log('--------------------------------------');
                        console.log('device设备的id:', that.data.deviceId);
                        console.log('device设备的服务id:', that.data.serviceId);
                        /**
                         * 延迟3秒，根据服务获取特征 
                         */
                        setTimeout(function () {
                            wx.getBLEDeviceCharacteristics({
                                // 这里的 deviceId 需要在上面的 getBluetoothDevices
                                deviceId: that.data.deviceId,
                                // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
                                serviceId: that.data.serviceId,
                                success: function (res) {
                                    console.log('000000000000' + that.data.serviceId);
                                    console.log('device getBLEDeviceCharacteristics:', res.characteristics)
                                    for (var i = 0; i < 5; i++) {
                                        if (res.characteristics[i].uuid.indexOf("cd20") != -1) {
                                            that.setData({
                                                cd20: res.characteristics[i].uuid,
                                                characteristics20: res.characteristics[i]
                                            });
                                        }
                                        if (res.characteristics[i].uuid.indexOf("cd01") != -1) {
                                            that.setData({
                                                cd01: res.characteristics[i].uuid,
                                                characteristics01: res.characteristics[i]
                                            });
                                        }
                                        if (res.characteristics[i].uuid.indexOf("cd02") != -1) {
                                            that.setData({
                                                cd02: res.characteristics[i].uuid,
                                                characteristics02: res.characteristics[i]
                                            });
                                        } if (res.characteristics[i].uuid.indexOf("cd03") != -1) {
                                            that.setData({
                                                cd03: res.characteristics[i].uuid,
                                                characteristics03: res.characteristics[i]
                                            });
                                        }
                                        if (res.characteristics[i].uuid.indexOf("cd04") != -1) {
                                            that.setData({
                                                cd04: res.characteristics[i].uuid,
                                                characteristics04: res.characteristics[i]
                                            });
                                        }
                                    }
                                    console.log('cd01= ' + that.data.cd01 + 'cd02= ' + that.data.cd02 + 'cd03= ' + that.data.cd03 + 'cd04= ' + that.data.cd04 + 'cd20= ' + that.data.cd20);
                                    /**
                                     * 回调获取 设备发过来的数据
                                     */
                                    wx.onBLECharacteristicValueChange(function (characteristic) {
                                        console.log('characteristic value comed:', characteristic.value)
                                        //{value: ArrayBuffer, deviceId: "D8:00:D2:4F:24:17", serviceId: "ba11f08c-5f14-0b0d-1080-007cbe238851-0x600000460240", characteristicId: "0000cd04-0000-1000-8000-00805f9b34fb-0x60800069fb80"}
                                        /**
                                         * 监听cd04cd04中的结果
                                         */
                                        if (characteristic.characteristicId.indexOf("cd01") != -1) {
                                            const result = characteristic.value;
                                            const hex = that.buf2hex(result);
                                            console.log(hex);
                                        }
                                        if (characteristic.characteristicId.indexOf("cd04") != -1) {
                                            const result = characteristic.value;
                                            const hex = that.buf2hex(result);
                                            console.log(hex);
                                            that.setData({result:hex});
                                        }

                                    })
                                    /**
                                     * 顺序开发设备特征notifiy
                                     */
                                    wx.notifyBLECharacteristicValueChanged({
                                        deviceId: that.data.deviceId,
                                        serviceId: that.data.serviceId,
                                        characteristicId: that.data.cd01,
                                        state: true,
                                        success: function (res) {
                                            // success
                                            console.log('notifyBLECharacteristicValueChanged success', res);
                                        },
                                        fail: function (res) {
                                            // fail
                                        },
                                        complete: function (res) {
                                            // complete
                                        }
                                    })
                                    wx.notifyBLECharacteristicValueChanged({
                                        deviceId: that.data.deviceId,
                                        serviceId: that.data.serviceId,
                                        characteristicId: that.data.cd02,
                                        state: true,
                                        success: function (res) {
                                            // success
                                            console.log('notifyBLECharacteristicValueChanged success', res);
                                        },
                                        fail: function (res) {
                                            // fail
                                        },
                                        complete: function (res) {
                                            // complete
                                        }
                                    })
                                    wx.notifyBLECharacteristicValueChanged({
                                        deviceId: that.data.deviceId,
                                        serviceId: that.data.serviceId,
                                        characteristicId: that.data.cd03,
                                        state: true,
                                        success: function (res) {
                                            // success
                                            console.log('notifyBLECharacteristicValueChanged success', res);
                                        },
                                        fail: function (res) {
                                            // fail
                                        },
                                        complete: function (res) {
                                            // complete
                                        }
                                    })

                                    wx.notifyBLECharacteristicValueChanged({
                                        // 启用 notify 功能
                                        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
                                        deviceId: that.data.deviceId,
                                        serviceId: that.data.serviceId,
                                        characteristicId: that.data.cd04,
                                        state: true,
                                        success: function (res) {
                                            console.log('notifyBLECharacteristicValueChanged success', res)
                                        }
                                    })

                                }, fail: function (res) {
                                    console.log(res);
                                }
                            })
                        }
                            , 1500);
                    }
                })
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete
            }
        })
    },

    /**
     * 发送 数据到设备中
     */
    bindViewTap: function () {
        var that = this;
        var hex = 'AA5504B10000B5'
        var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16)
        }))
        console.log(typedArray)
        console.log([0xAA, 0x55, 0x04, 0xB1, 0x00, 0x00, 0xB5])
        var buffer1 = typedArray.buffer
        console.log(buffer1)
        wx.writeBLECharacteristicValue({
            deviceId: that.data.deviceId,
            serviceId: that.data.serviceId,
            characteristicId: that.data.cd20,
            value: buffer1,
            success: function (res) {
                // success
                console.log("success  指令发送成功");
                console.log(res);
            },
            fail: function (res) {
                // fail
                console.log(res);
            },
            complete: function (res) {
                // complete
            }
        })

    },
    buf2hex: function (buffer) { // buffer is an ArrayBuffer
        return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    }
})