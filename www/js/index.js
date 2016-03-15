/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    scan: function() {
     // var scan_button = document.getElementById('scan');
      // cordova.plugins.barcodeScanner.scan(
      //     function (result) {
      //         $.ajax({
      //            method: "GET",
      //            url: "http://www.event.phpindonesia.or.id/index.php?r=attending/setAttendance",
      //            data: {hash: result.text},
      //            dataType: 'json',
      //          })
      //          .done(function(msg){
      //              if(msg.message=="Already Scan"){
      //                  var ja = "Peserta ini Sudah di Absen";
      //               }
      //             else { var ja = "Absen berhasil dilakukan";}

      //                var alerthaha = "<div data-role='header'><h2>" + ja + "</h2></div><div data-role='main' class='ui-content' id='biodata'> nama : " + msg.fullname + "</br> Profesi : " + msg.job_id + "<br/> Gender : " + msg.gender + "</div> <img width='30%' style='float:right; margin:5px;' src='http://res.cloudinary.com/okaprinarjaya/image/upload/c_fill,h_180,w_180/v1/phpindonesia/production/"+ msg.photo +"'/></div>";
      //                 //setelah dapat langsung scan lgi
      //                 //scan_button.click();
      //                 $("#info").html(alerthaha);
      //                 $( "#info").popup('open');
      //          })  
      //          .fail(function() {
      //              alert( "tidak bisa ajax" );
      //          });
      //     }, 
      //     function (error) {
      //         alert("Scanning failed: " + error);
      //     }
      //  );
        // console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        var scan_button = document.getElementById('scan');
        scanner.scan( function (result) { 

            $.ajax({
               method: "GET",
               url: "http://www.event.phpindonesia.or.id/index.php/attending/setAttendance?",
               data: { hash: result.text },
               dataType: 'json',
             })
             .done(function( msg ) {
                 if(msg.message=="Already Scan"){
                     var ja = "Peserta ini Sudah di Absen";
                  }
                else { var ja = "Absen berhasil dilakukan";}

                   // var alerthaha = "<div data-role='header'><h2>" + ja + "</h2></div><div data-role='main' class='ui-content' id='biodata'> nama : " + msg.fullname + "</br> Profesi : " + msg.job_id + "<br/> Gender : " + msg.gender + "</div> <img width='30%' style='float:left; margin:5px;' src='http://res.cloudinary.com/okaprinarjaya/image/upload/c_fill,h_180,w_180/v1/phpindonesia/production/"+ msg.photo +"'/></div>";
                    // $("#info").html(alerthaha);
                    // $( "#info").popup('open');
                    var alerthaha = "<div id='biodata'> nama : " + msg.fullname + "</br> Profesi : " + msg.job_id + "<br/> Gender : " + msg.gender + "</div> <img width='30%' style='float:left; margin:5px;' src='http://res.cloudinary.com/okaprinarjaya/image/upload/c_fill,h_180,w_180/v1/phpindonesia/production/"+ msg.photo +"'/></div>";
                    $(".modal-title").html(ja);
                    $(".modal-body").html(alerthaha);
                    $('#myModal').modal('show');
             })  
             .fail(function() {
                 $(".modal-body").html("tidak bisa terkoneksi ke server");
                 //$( "#info").popup('open');
                 $('#myModal').modal('show');
             });

        }, function (error) { 
            // $("#info").html(error);
            // $( "#info").popup('open');
            $(".modal-body").html(error);
            $('#myModal').modal('show');
        } );
    }
};
