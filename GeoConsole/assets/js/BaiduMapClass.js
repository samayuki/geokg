const opt = [
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": {
      "lightness": 20
    }
  },
  {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
      "color": "#f49935"
    }
  },
  {
    "featureType": "railway",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "local",
    "elementType": "labels",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": {
      "color": "#d1e5ff"
    }
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": {
      "visibility": "off"
    }
  }
];

const EventUtil={
  /*检测绑定事件*/
  addHandler:function(element,type,handler, param = {}){
    if(element.addEventListener){
      element.addEventListener(type,function () {
        handler.call(this, param)
      },false);
    }
    else if(element.attachEvent){
      element.attachEvent('on'+type,function () {
        handler.call(this, param)
      });
    }
    else{
      element["on"+type]=handler(param) /*直接赋给事件*/
    }
  }
};
function BaiduMapClass(bm, options = []) {
  this.map = bm;
  this.opt = options === [] ? opt : options;
  this._numMarkers = [];
  this.data = [];
  this._init();
}

BaiduMapClass.prototype._init = function () {
  this.map.setMapStyle({
    styleJson:[[this.opt]]
  });
  this.map.enableScrollWheelZoom(true);
  let point = new BMap.Point(115.000000,23.000000);
  this.map.centerAndZoom(point, 8);
  this.map.addControl(new BMap.ScaleControl());
  this.map.addControl(new BMap.OverviewMapControl());
  const top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
  this.map.addControl(top_right_navigation);
  this.map.enableInertialDragging();
  this.map.enableContinuousZoom();
  this.map.setCurrentCity("广东");
};

BaiduMapClass.prototype.addMarker = function(point) {
  let name = point["name"];
  let location = point["location"];
  let mp = new BMap.Point(location.lng, location.lat);
  let label = new BMap.Label(name,{offset:new BMap.Size(20,-10)});
  let marker = new BMap.Marker(mp);
  this.map.addOverlay(marker);
  marker.setLabel(label);
  this._numMarkers.push(marker);
  this.data.push(point);
};

BaiduMapClass.prototype.addMarkers = function(points) {
  for(let i = 0; i < points.length; i++) {
   this.addMarker(points[i]);
  }
};

BaiduMapClass.prototype.handleShowWindow = function(point) {
  let href = "/building?name="+ point["name"];
  let clickContent ="<a href="+ href+" target='_blank'><h5>"+point["name"]+"</h5></a>"+
    "<img style='float: left' id='imgDemo' src="+ require('../img/building-img-demo.jpg') + " width='140' height='120' />"
  let infoWindow = new BMap.InfoWindow(clickContent);  // 创建信息窗口对象
  this.openInfoWindow(infoWindow);
  //图片加载完毕重绘infowindow
  document.getElementById('imgDemo').onload = function (){
    infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
  };
};

BaiduMapClass.prototype.showInfoWindow = function () {
  if (this._numMarkers.length === 0) {
    return;
  } else {
    for(let i = 0; i < this._numMarkers.length; i++) {
      let marker = this._numMarkers[i];
      EventUtil.addHandler(marker,"mouseover",this.handleShowWindow, this.data[i]);
    }
  }
};

BaiduMapClass.prototype.handleDrag = function(point) {
  let res = confirm("确定修改吗？"+"lng: "+this.point.lng + ", lat: " + this.point.lat);
  if(res === true) {
    console.log("yes");
  } else {
    console.log("no");
  }
};

BaiduMapClass.prototype.enableDragEdit = function () {
  if(this._numMarkers.length === 0) {
    return;
  } else {
    for(let i = 0; i < this._numMarkers.length; i++) {
      let marker = this._numMarkers[i];
      marker.enableDragging();
      EventUtil.addHandler(marker,"dragend",this.handleDrag, this.data[i]);
    }
  }
};

BaiduMapClass.prototype.searchLocation = function (search_word) {
  let map = this.map;
  let myKeys = search_word;
  let bounds = [];
  let flag = false;
  for(let i = 0; i < this.data.length; i++) {
    if(this.data[i]["name"].search(myKeys)!==-1){
      let location = this.data[i]["location"];
      let point = new BMap.Point(location.lng, location.lat);
      bounds.push(point);
      flag = true;
    }
  }
  map.setViewport(bounds);
  if(!flag) {
    let local = new BMap.LocalSearch(map, {
      renderOptions:{map: map}
    });
    local.searchInBounds(myKeys, map.getBounds());
  }
};

export default BaiduMapClass;
