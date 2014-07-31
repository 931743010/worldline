var arrColors   = ['red','green','blue','yellow','navy','gold','dodgerblue','navajowhite','mediumpurple'];

//����������,����
function s(a,b) {
  return a - b;
}
//�������÷�
//array.sort(s);

//ɾ�������е�һ��Ԫ�أ�����dx��ʾ��Ԫ�ص�index
Array.prototype.baoremove = function(dx)
{
  if(isNaN(dx)||dx>this.length){return false;}
  this.splice(dx,1);
}

//�����������飬ȥ��Ϊ�յ�ֵ���߷�������ֵ
//������һ����ά���飬��һά��ʾ��ֵ�����飬�ڶ�ά��ʾ��ݵ����飬
//����������������ǰ����뱣��һһ��Ӧ��ϵ
function resortArray() {
  //var tmparr1 = tmparr[0];
  //var tmparr2 = tmparr[1];
  var len = arrUseValue.length;
  var tmpi = 0;
  for(var i=0; i<len; i++) {
    if(isNaN(arrUseValue[tmpi])) {
      arrUseValue.baoremove(tmpi);
      arrUseYear.baoremove(tmpi);
      tmpi = (i > 0) ? i : 0;
      //tmparr1.baoremove(i);
      //tmparr2.baoremove(i);
    } else {
      tmpi = i + 1;
    }
  }
  //var retarr = new Array(tmparr1,tmparr2);
  //return retarr;
}

function getMaxValue(tmparr) {
  var maxValue = 0;
  for (var i=0; i<tmparr.length; i++) {
    var value = parseFloat(tmparr[i]);
    if (value > maxValue) maxValue = value;
  }
  maxValue = Math.ceil(maxValue);
  return maxValue;
}


function getMinValue(tmparr) {
  var minValue = 1000000000000000;
  for (var i=0; i<tmparr.length; i++) {
    var value = parseFloat(tmparr[i]);
    if (value < minValue) {
      minValue = value;
    }
  }
  minValue = Math.floor(minValue);
  return minValue;
}


function getMaxPeriod(tmparr) {
  var maxValue = 0;
  for (var i=0; i<tmparr.length; i++) {
    var value = tmparr[i][0];
    if (value > maxValue) maxValue = value;
  }
  return maxValue;
}


function getMinPeriod(tmparr) {
  var minPeriod = 3000;
  for (var i=0; i<tmparr.length; i++) {
    var value = tmparr[i][0];
    if (value < minPeriod) minPeriod = value;
  }
  return minPeriod;
}

//��ʾ��ʾ����    
function ShowTooltip(mousemove_event,txt)
{
  //obj=mousemove_event.target.parentNode;
  //obj.style.setProperty("opacity","0.5");
  
  var ttrelem,tttelem,posx,posy,curtrans,ctx,cty;

  ttrelem=svgDoc.getElementById("ttr");
  tttelem=svgDoc.getElementById("ttt");

  posx=mousemove_event.clientX;
  posy=mousemove_event.clientY;
  tttelem.childNodes.item(0).data=txt;

  curtrans=svgDoc.documentElement.currentTranslate;
  ctx=curtrans.x;
  cty=curtrans.y;

  ttrelem.setAttribute("x",posx-ctx);
  ttrelem.setAttribute("y",posy-cty-20);
  tttelem.setAttribute("x",posx-ctx+5);
  tttelem.setAttribute("y",posy-cty-8);
  ttrelem.setAttribute("width",tttelem.getComputedTextLength()+30);
  tttelem.setAttribute("style","fill: #00C; font-size: 13px; visibility: visible");
  ttrelem.setAttribute("style","fill: #FFC; stroke: #000; stroke-width: 0.5px;\
    visibility: visible");
}
//������ʾ����
function HideTooltip(mouseout_event)
{
  //obj=mouseout_event.target.parentNode;
  //obj.style.setProperty("opacity","1.0");
  
  var ttrelem,tttelem;

  ttrelem=svgDoc.getElementById("ttr");
  tttelem=svgDoc.getElementById("ttt");
  ttrelem.setAttribute("style","visibility: hidden");
  tttelem.setAttribute("style","visibility: hidden");
}
//��������
function ZoomControl()
{
  var curzoom;

  curzoom=svgDoc.documentElement.currentScale;
  svgDoc.getElementById("tooltip").setAttribute("transform","scale("+1/curzoom+")");
}
    
//���svgͼ���е�����Ԫ�أ��������»�ͼ
function deleItem() {
  //var gnode = svgDoc.getElementById("gc");
  while (gnode.getChildNodes().getLength() > 0) {
    gnode.removeChild(gnode.getFirstChild());
  }
}

//������ͼ����һ����������ֵ���飬
//�ڶ�����������Сֵ�����������������ֵ
function drawPolyline(tmparr,tmpminv,tmpmaxv) {
  var vpoint = "";
  var t = tmparr.length;
  var addv = 152 / (t - 1);
  var vx = 20;
  var vy = 0;
  tmpdiv = (tmpmaxv - tmpminv) / 5;
  
  tmpmaxv = Math.ceil(tmpmaxv + tmpdiv);
  tmpminv = Math.floor(tmpminv - tmpdiv);
  
  for(var i=0;i<t;i++) {
    var txtcirc = arrUseYear[i] + ", " + tmparr[i];
    //ȷ��x����
    vx = 20 + i * addv;
    vpoint += vx + ",";
    //ȷ��y����
    //alert(tmparr[i]);
    vy = 120 - (tmparr[i] - tmpminv) / (tmpmaxv - tmpminv) * 120;
    vpoint += vy + ",";
    
    //���СԲ��
    var newcircle = svgDoc.createElement("circle");
    newcircle.setAttribute("cx",vx);
    newcircle.setAttribute("cy",vy);
    newcircle.setAttribute("r",2);
    newcircle.setAttribute("style","cursor:crosshair;fill:" + arrColors[i]);
    newcircle.setAttribute("onmouseover","ShowTooltip(evt,'" + txtcirc + "')" );
    newcircle.setAttribute("onmouseout","HideTooltip(evt)");
    gnode.appendChild(newcircle);
  }
  vpoint  = vpoint.substring(0,(vpoint.length - 1));
  //alert(vpoint);
  var newpoly = svgDoc.createElement("polyline");
  newpoly.setAttribute("points",vpoint);
  newpoly.setAttribute("style","fill: none; stroke: #00C; stroke-width: 1.5px");
  gnode.appendChild(newpoly);
}

//����״ͼ����һ����������ֵ���飬
//�ڶ�����������Сֵ�����������������ֵ
function drawRectange(tmparr,tmpminv,tmpmaxv) {
  var vpoint = "";
  var t = tmparr.length;
  //var addv = 32.5;
  var addv = 130 / (t - 1);
  var vx = 27;
  var vy = 0;
  tmpdiv = (tmpmaxv - tmpminv) / 5;
  
  tmpmaxv = Math.ceil(tmpmaxv + tmpdiv);
  tmpminv = Math.floor(tmpminv - tmpdiv);

  for(var i=0;i<t;i++) {
    var txtrect = arrUseYear[i] + ", " + tmparr[i];
    //ȷ��x����
    vx = 27 + i * addv;
    //ȷ��y����
    vy = 120 - (tmparr[i] - tmpminv) / (tmpmaxv - tmpminv) * 120;
    var newrect = svgDoc.createElement("rect");
    newrect.setAttribute("x",vx);
    newrect.setAttribute("y",vy);
    newrect.setAttribute("width",15);
    newrect.setAttribute("height",(120 - vy));
    newrect.setAttribute("style","cursor:crosshair;fill:" + arrColors[i]);
    newrect.setAttribute("onmouseover","ShowTooltip(evt,'" + txtrect + "')" );
    newrect.setAttribute("onmouseout","HideTooltip(evt)");
    gnode.appendChild(newrect);
  }
}

//����ͼ,��һ����������ֵ���飬�ڶ����������������
function drawPie(tmparr1,tmparr2) {
    var basePointX     = 62.;
    var basePointY     = 65.;
    var currentX       = 0.0;
    var currentY       = 0.0;
    var offsetX1       = 0.0;
    var offsetY1       = 0.0;
    var offsetX2       = 0.0;
    var offsetY2       = 0.0;
    var radius         = 60.;
    var angleSum1      = 0.;
    var angleSum2      = 0.;
    var vertexCount    = tmparr1.length;
    var xPts           = Array(vertexCount);
    var yPts           = Array(vertexCount);
    var angles         = Array(vertexCount);
    var pointPath      = "";
    var colorCount     = arrColors.length;

    var pieNode        = null;
    var gcNode         = null;
    
    var dataSum = 0.;

    for(var v=0; v<vertexCount; v++)
    {
       dataSum += Math.abs(parseFloat(tmparr1[v]));
    }
    //alert(dataSum);
    for(var v=0; v<vertexCount; v++)
    {
       angles[v] = 360.*Math.abs(parseFloat(tmparr1[v]))/dataSum;
    }
    //alert(angles);
    gcNode = svgDoc.getElementById("gc");
    var txtstyle = "text-anchor:left;";
    for(var v=0; v<vertexCount; v++)
    {
       angleSum2 = angleSum1 + angles[v];
       var txtpv = parseInt(Math.abs(tmparr1[v])/dataSum *10000) / 100 + "%";
       
       offsetX1 = radius*Math.cos(angleSum1*Math.PI/180);
       offsetY1 = radius*Math.sin(angleSum1*Math.PI/180);
       offsetX2 = radius*Math.cos(angleSum2*Math.PI/180);
       offsetY2 = radius*Math.sin(angleSum2*Math.PI/180);

       currentX = basePointX+offsetX2;
       currentY = basePointY-offsetY2;

      // the vertical offset must be subtracted,
      // so we need to "flip" the sign of offsetY1
       offsetY1 *= -1;

       pointPath = "M"+basePointX+","+basePointY;
       pointPath += " l"+offsetX1+","+offsetY1;
       if(angles[v] < 180 ) {
         pointPath += " A"+radius+","+radius+" 0 0 0 ";
       } else {
         pointPath += " A"+radius+","+radius+" 0 1 0 ";
       }
       pointPath += currentX+","+currentY;
       pointPath += " L"+basePointX+","+
                        basePointY+"z";

       fillColor  = "fill:" + arrColors[v%colorCount];

       txtGnode = tmparr2[v] + "," + tmparr1[v] + "," + txtpv;
       //alert(txtGnode);
       var newg = svgDoc.createElement("g");
       //newg.addEventListener("mouseover",OpacityDown,true);
       //newg.addEventListener("mouseout",OpacityUp,true);
       newg.setAttribute("onmouseover","ShowTooltip(evt,'" + txtGnode + "')" );
       newg.setAttribute("onmouseout","HideTooltip(evt)");
       gcNode.appendChild(newg);

       pieNode = svgDoc.createElement("path");
       pieNode.setAttribute("d",    pointPath);
       pieNode.setAttribute("style",fillColor);
       newg.appendChild(pieNode);
       
       var recNode = svgDoc.createElement("rect");
       recNode.setAttribute("x",123);
       recNode.setAttribute("y",(10 + v*10));
       recNode.setAttribute("width",3);
       recNode.setAttribute("height",3);
       recNode.setAttribute("style",fillColor);
       newg.appendChild(recNode);
       
       var txtNode = svgDoc.createElement("text");
       txtNode.setAttribute("x",128);
       txtNode.setAttribute("y",(15 + v*10));
       txtst = txtstyle + fillColor;
       txtNode.setAttribute("style",txtst);
       newg.appendChild(txtNode);
       texte=svgDoc.createTextNode(tmparr2[v] + "[" + txtpv + "]");
       txtNode.appendChild(texte);

       angleSum1 += angles[v];
    }
}

//�趨x������,���߼���ӱ���,�������������
function setXAxis(tmparr) {
  //��x����
  var newline = svgDoc.createElement("line");
  newline.setAttribute("x1",20);
  newline.setAttribute("y1",120);
  newline.setAttribute("x2",172);
  newline.setAttribute("y2",120);
  newline.setAttribute("style","stroke-width:2;stroke:blue");
  gnode.appendChild(newline);
  
  var t = tmparr.length - 1;
  var addv = 152 / t;
  var addt = 144 / t;
  var sumlv = 20;
  var sumtv = 17;
	//��x�������
  newtext = svgDoc.createElement("text");
  newtext.setAttribute("x",sumtv);
  newtext.setAttribute("y",127);
  gnode.appendChild(newtext);
  texte=svgDoc.createTextNode(tmparr[0]);
  newtext.appendChild(texte);
  for(var i=0;i<t;i++) {
    //��x���С����
    sumlv = 20 + (i + 1) * addv;
    newline = svgDoc.createElement("line");
	  newline.setAttribute("x1",sumlv);
	  newline.setAttribute("y1",0);
	  newline.setAttribute("x2",sumlv);
	  newline.setAttribute("y2",120);
	  newline.setAttribute("style","stroke-width:0.5;stroke:white");
	  gnode.appendChild(newline);
	  //��x�������
	  sumtv = 17 + (i + 1) * addt;
	  newtext = svgDoc.createElement("text");
	  newtext.setAttribute("x",sumtv);
	  newtext.setAttribute("y",127);
	  gnode.appendChild(newtext);
	  texte=svgDoc.createTextNode(tmparr[i+1]);
    newtext.appendChild(texte);
  }
}

//�趨y������,���߼���ӱ���,��һ����������Сֵ���ڶ������������ֵ
function setYAxis(tmpminv,tmpmaxv) {
  //��y����
  var newline = svgDoc.createElement("line");
  newline.setAttribute("x1",20);
  newline.setAttribute("y1",0);
  newline.setAttribute("x2",20);
  newline.setAttribute("y2",120);
  newline.setAttribute("style","stroke-width:2;stroke:blue");
  gnode.appendChild(newline);
  
  var addv = 24;
  var sumlv = 0;
  var sumtv = 4;

  tmpdiv = (tmpmaxv - tmpminv) / 5;
  tmpmaxv = Math.ceil(tmpmaxv + tmpdiv);
  tmpminv = Math.floor(tmpminv - tmpdiv);

  var divtxt = (tmpmaxv - tmpminv) / 5;
  for(var i=0;i<5;i++) {
    //��y���С����
    sumlv = 0 + i * addv;
    newline = svgDoc.createElement("line");
	  newline.setAttribute("x1",20);
	  newline.setAttribute("y1",sumlv);
	  newline.setAttribute("x2",172);
	  newline.setAttribute("y2",sumlv);
	  newline.setAttribute("style","stroke-width:0.5;stroke:white");
	  gnode.appendChild(newline);
	}
	for(var i=0;i<6;i++) {
	  //��y�������
	  if(i == 0) {
	    sumtv = 7;
	  } else {
	    sumtv = 4 + i * 24;
	  }
	  txtdata = tmpmaxv - Math.round(divtxt * i);
	  newtext = svgDoc.createElement("text");
	  newtext.setAttribute("x",1);
	  newtext.setAttribute("y",sumtv);
	  gnode.appendChild(newtext);
	  texte=svgDoc.createTextNode(txtdata);
    newtext.appendChild(texte);
  }
}

//�趨��˾������
function setCompanyName(companyname) {
  parent.all['svgtitle'].innerHTML = companyname;
}

//�趨ͼ��ı���,�漰��������ͱ�������ͬʱ�䶯
function setGraphTitle(title) {
  //
}

//�����̬�ı�ͼ��ĺ���,��һ����������ֵ���飬�ڶ����������������
//function svgViewChange(tmparr1,tmparr2) {
function svgViewChange(tmparr1,tmparr2,type) {
  arrUseValue = tmparr1;
  arrUseYear = tmparr2;
  //alert(arrUseValue);
  //alert(arrUseYear);
  resortArray();
  svgType = type;
  if(svgType == 1) {
    deleItem();
    useMinValue = getMinValue(arrUseValue);
    useMaxValue = getMaxValue(arrUseValue);
    setXAxis(arrUseYear);
    setYAxis(useMinValue,useMaxValue);
    drawPolyline(arrUseValue,useMinValue,useMaxValue);
  } else if(svgType == 2) {
    deleItem();
    useMinValue = getMinValue(arrUseValue);
    useMaxValue = getMaxValue(arrUseValue);
    setXAxis(arrUseYear);
    setYAxis(useMinValue,useMaxValue);
    drawRectange(arrUseValue,useMinValue,useMaxValue);
  } else if(svgType == 3) {
    deleItem();
    useMinValue = getMinValue(arrUseValue);
    useMaxValue = getMaxValue(arrUseValue);
    drawPie(arrUseValue,arrUseYear);
  }
}

function opennewwin() {
  mynewwin = window.open ('bigimg.html', 'svgnewwindow', 'height=320, width=370, top=100, left=100, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no');
}
