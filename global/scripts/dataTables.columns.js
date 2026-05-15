dt.tblColDefs = {
  checkBox: {
    title: '<div class="form-group hide" tabindex="0"> <input type="radio" class="radio-custom" id="folder" name="folder" value="folder" /> <label for="folder" class="radio-custom-label"> &nbsp;</label> </div>',
    data: '', className:'all-check noVis', orderable : false , width:20, searchable: false,
    render: function (data, type, rowData, meta) {
      var id = "checkbox_" + meta.row;
      return '<div class="form-group" tabindex="0"> <input class="radio-custom" name="folder" type="radio" value="' + meta.row + '" id="' + id + '"> <label class="radio-custom-label" for="' + id + '"> &nbsp;</label> </div>';
    }
  },
  field:{
    title:'Field',
    data: 'field', width:150, searchable: false, className:'text-left'
  },
  value:{
    title:'Value',
    data: 'value', width:150, searchable: false, className:'text-center'
  },
  name:{
    title:'Name',
    data: 'name', searchable: true, className:'text-left'
  },
  image:{
    title:'',
    data:'image', searchable: false, orderable: false,
    render: function (data, type, rowData, meta) {
      if(data){
        return '<div class="img-wrap"><img src="' + data + '"/></div>';
      }
      return '<i class="icon folder"></i>';
    }
  },
  dateCreated:{
    title:'Date Created',
    data: 'dateCreated', searchable: false, className:'text-center'
  },
  lastModified:{
    title:'Last Modified',
    data: 'lastModified', searchable: false, className:'text-center'
  },
  fsipUserStatus:{
    title:'',
    data:'fsipUserStatus', searchable: false, orderable: false, className: "fsip-info-item",
    render: function (data, type, rowData, meta) {
      return '<i class="icon icon-'+ data +'"></i>';
    }
  },
  fsipId:{
    title: 'FSIP ID',
    data: 'fsipId', searchable: false, orderable: true, className: "fsip-info-item",
    render: function (data, type, rowData, meta) {
      return '<div class="prof-avatar"><span class="avatar-img"><img src="../_global/styles/images/icons/person.svg"></span><a class="profName" href="javascript:;">'+ data[1] +'</a></div>';
    }
  },
  enrolmentType:{
    title: 'Enrolment Type',
    data: 'enrolmentType', searchable: false, orderable: true, className: "fsip-info-item"
  },
  dateTimeCaptured:{
    title: 'Date/Time Captured',
    data: 'dateTimeCaptured', searchable: false, orderable: true, className: "fsip-info-item"
  },
  customerId:{
    title: 'Customer ID',
    data: 'customerId', searchable: false, orderable: false, className:'text-right overflow-visible fsip-info-item',
    render: function (data, type, rowData, meta) {
      var dataLabel =  data.trim().length ? data : '<span class="placeholder">Enter Customer Id</span>';
      return '<div class="fsip-customer-id-widget">' +
                '<div class="fsip-customer-label">'+ dataLabel +'</div>' +
                '<div class="fsip-customer-id-edit-widget hide">' +
                  '<div class="approve-edit-btn-group">' +
                    '<button id="btnCloseEdit'+meta.row+'" class="btn btn-link"><i class="icon icon-close"></i></button>' +
                    '<button id="btnApproveEdit'+meta.row+'" class="btn btn-link"><i class="icon icon-tick"></i></button>' +
                  '</div>' +
                  '<input type="text" class="fsip-customer-id " value="'+ data +'" placeholder="Enter ID" />' +
                '</div>' +
              '</div>';
    }
  },
  editCustomerId:{
    title: '',
    data: 'editCustomerId', searchable: false, orderable: false, className: "fsip-info-item",
    render: function (data, type, rowData, meta) {
      return '<a class="edit-customer-id" href="javascript:;"><i class="icon icon-edit"></i></a>';
    }
  }
};