import test from 'ava'
import { readFile } from 'fs'
import difference from 'lodash/difference'
import {
  removeComments,
  removeTrailingSpaces,
  removeTrailingSeparatorSpaces,
  parseCss
} from './parsers'

test('Clean should remove comments', t => {
  const withComments = `
/* * * * * * * * * *
* Fancy Title :D! *
* * * * * * * * * */

.body {
  color: red;/* // are not accepted comments! */
}
.footer {
  color: blue;/* // are not accepted comments! */
}
`

  const withoutComments = `


.body {
  color: red;
}
.footer {
  color: blue;
}
`

  const noComments = removeComments(withComments)

  t.is(noComments, withoutComments)
})

test('Remove trailing spaces', t => {
  const withTrailing = `


         .body {
  color: red;
}
.footer{
  color: blue;
}
`
  const withoutTrailing = `.body {\n  color: red;\n}\n.footer{\n  color: blue;\n}`

  t.is(withoutTrailing, removeTrailingSpaces(withTrailing))
})

test('removeTrailingSeparatorSpaces', t => {
  const withTrailingSeparatorSpaces = `.body {\n  color: red;\n}\n.footer        {\n  color: blue;\n}`
  const withoutTrailingSeparatorSpaces = `.body{color:red;}.footer{color:blue;}`

  t.is(withoutTrailingSeparatorSpaces, removeTrailingSeparatorSpaces(withTrailingSeparatorSpaces))
})

const expectedParsed = ['h1','h2','h3','h4','h5','h6','lead','display-1','display-2','display-3','display-4','small','mark','list-unstyled','list-inline','list-inline-item','initialism','blockquote','blockquote-footer','img-fluid','img-thumbnail','figure','figure-img','figure-caption','pre-scrollable','container','container-fluid','row','no-gutters','col','col-1','col-10','col-11','col-12','col-2','col-3','col-4','col-5','col-6','col-7','col-8','col-9','col-auto','col-lg','col-lg-1','col-lg-10','col-lg-11','col-lg-12','col-lg-2','col-lg-3','col-lg-4','col-lg-5','col-lg-6','col-lg-7','col-lg-8','col-lg-9','col-lg-auto','col-md','col-md-1','col-md-10','col-md-11','col-md-12','col-md-2','col-md-3','col-md-4','col-md-5','col-md-6','col-md-7','col-md-8','col-md-9','col-md-auto','col-sm','col-sm-1','col-sm-10','col-sm-11','col-sm-12','col-sm-2','col-sm-3','col-sm-4','col-sm-5','col-sm-6','col-sm-7','col-sm-8','col-sm-9','col-sm-auto','col-xl','col-xl-1','col-xl-10','col-xl-11','col-xl-12','col-xl-2','col-xl-3','col-xl-4','col-xl-5','col-xl-6','col-xl-7','col-xl-8','col-xl-9','col-xl-auto','order-first','order-last','order-0','order-1','order-2','order-3','order-4','order-5','order-6','order-7','order-8','order-9','order-10','order-11','order-12','offset-1','offset-2','offset-3','offset-4','offset-5','offset-6','offset-7','offset-8','offset-9','offset-10','offset-11','table','table-sm','table-bordered','table-borderless','table-striped','table-hover','table-primary','table-secondary','table-success','table-info','table-warning','table-danger','table-light','table-dark','table-active','thead-dark','thead-light','table-responsive','form-control','form-control-file','form-control-range','col-form-label','col-form-label-lg','col-form-label-sm','form-control-plaintext','form-control-lg','form-control-sm','input-group-lg','input-group-append','btn','input-group-text','input-group-prepend','input-group-sm','form-group','form-text','form-row','form-check','form-check-input','form-check-label','form-check-inline','valid-feedback','valid-tooltip','custom-select','is-valid','was-validated','custom-control-input','custom-control-label','custom-file-input','custom-file-label','invalid-feedback','invalid-tooltip','is-invalid','form-inline','focus','disabled','active','btn-primary','show','dropdown-toggle','btn-secondary','btn-success','btn-info','btn-warning','btn-danger','btn-light','btn-dark','btn-outline-primary','btn-outline-secondary','btn-outline-success','btn-outline-info','btn-outline-warning','btn-outline-danger','btn-outline-light','btn-outline-dark','btn-link','btn-group-lg','btn-lg','btn-group-sm','btn-sm','btn-block','fade','collapse','collapsing','dropdown','dropleft','dropright','dropup','dropdown-menu','dropdown-menu-right','dropdown-divider','dropdown-item','dropdown-header','dropdown-item-text','btn-group','btn-group-vertical','btn-toolbar','input-group','dropdown-toggle-split','btn-group-toggle','custom-file','custom-control','custom-control-inline','custom-checkbox','custom-radio','custom-select-sm','custom-select-lg','custom-range','nav','nav-link','nav-tabs','nav-item','nav-pills','nav-fill','nav-justified','tab-content','tab-pane','navbar','navbar-brand','navbar-nav','navbar-text','navbar-collapse','navbar-toggler','navbar-toggler-icon','navbar-expand','navbar-light','navbar-dark','card','list-group','list-group-item','card-body','card-title','card-subtitle','card-text','card-link','card-header','card-footer','card-header-tabs','card-header-pills','card-img-overlay','card-img','card-img-top','card-img-bottom','card-deck','card-group','card-columns','accordion','breadcrumb','breadcrumb-item','pagination','page-link','page-item','pagination-lg','pagination-sm','badge','badge-pill','badge-primary','badge-secondary','badge-success','badge-info','badge-warning','badge-danger','badge-light','badge-dark','jumbotron','jumbotron-fluid','alert','alert-heading','alert-link','alert-dismissible','close','alert-primary','alert-secondary','alert-success','alert-info','alert-warning','alert-danger','alert-light','alert-dark','progress','progress-bar','progress-bar-striped','progress-bar-animated','media','media-body','list-group-item-action','list-group-flush','list-group-item-primary','list-group-item-secondary','list-group-item-success','list-group-item-info','list-group-item-warning','list-group-item-danger','list-group-item-light','list-group-item-dark','modal-open','modal','modal-dialog','modal-dialog-centered','modal-content','modal-backdrop','modal-header','modal-title','modal-body','modal-footer','modal-scrollbar-measure','tooltip','arrow','bs-tooltip-auto','bs-tooltip-top','bs-tooltip-right','bs-tooltip-bottom','bs-tooltip-left','tooltip-inner','popover','bs-popover-auto','bs-popover-top','bs-popover-right','bs-popover-bottom','popover-header','bs-popover-left','popover-body','carousel','carousel-inner','carousel-item','carousel-item-next','carousel-item-prev','carousel-item-left','carousel-item-right','carousel-fade','carousel-control-next','carousel-control-prev','carousel-control-next-icon','carousel-control-prev-icon','carousel-indicators','carousel-caption','align-baseline','align-top','align-middle','align-bottom','align-text-bottom','align-text-top','bg-primary','bg-secondary','bg-success','bg-info','bg-warning','bg-danger','bg-light','bg-dark','bg-white','bg-transparent','border','border-top','border-right','border-bottom','border-left','border-0','border-top-0','border-right-0','border-bottom-0','border-left-0','border-primary','border-secondary','border-success','border-info','border-warning','border-danger','border-light','border-dark','border-white','rounded','rounded-top','rounded-right','rounded-bottom','rounded-left','rounded-circle','rounded-0','clearfix','d-none','d-inline','d-inline-block','d-block','d-table','d-table-row','d-table-cell','d-flex','d-inline-flex','embed-responsive','embed-responsive-item','embed-responsive-21by9','embed-responsive-16by9','embed-responsive-4by3','embed-responsive-1by1','flex-row','flex-column','flex-row-reverse','flex-column-reverse','flex-wrap','flex-nowrap','flex-wrap-reverse','flex-fill','flex-grow-0','flex-grow-1','flex-shrink-0','flex-shrink-1','justify-content-start','justify-content-end','justify-content-center','justify-content-between','justify-content-around','align-items-start','align-items-end','align-items-center','align-items-baseline','align-items-stretch','align-content-start','align-content-end','align-content-center','align-content-between','align-content-around','align-content-stretch','align-self-auto','align-self-start','align-self-end','align-self-center','align-self-baseline','align-self-stretch','float-left','float-right','float-none','position-static','position-relative','position-absolute','position-fixed','position-sticky','fixed-top','fixed-bottom','sr-only','sr-only-focusable','shadow-sm','shadow','shadow-lg','shadow-none','w-25','w-50','w-75','w-100','w-auto','h-25','h-50','h-75','h-100','h-auto','mw-100','mh-100','m-0','mt-0','my-0','mr-0','mx-0','mb-0','ml-0','m-1','mt-1','my-1','mr-1','mx-1','mb-1','ml-1','m-2','mt-2','my-2','mr-2','mx-2','mb-2','ml-2','m-3','mt-3','my-3','mr-3','mx-3','mb-3','ml-3','m-4','mt-4','my-4','mr-4','mx-4','mb-4','ml-4','m-5','mt-5','my-5','mr-5','mx-5','mb-5','ml-5','p-0','pt-0','py-0','pr-0','px-0','pb-0','pl-0','p-1','pt-1','py-1','pr-1','px-1','pb-1','pl-1','p-2','pt-2','py-2','pr-2','px-2','pb-2','pl-2','p-3','pt-3','py-3','pr-3','px-3','pb-3','pl-3','p-4','pt-4','py-4','pr-4','px-4','pb-4','pl-4','p-5','pt-5','py-5','pr-5','px-5','pb-5','pl-5','m-auto','mt-auto','my-auto','mr-auto','mx-auto','mb-auto','ml-auto','text-monospace','text-justify','text-nowrap','text-truncate','text-left','text-right','text-center','text-lowercase','text-uppercase','text-capitalize','font-weight-light','font-weight-normal','font-weight-bold','font-italic','text-white','text-primary','text-secondary','text-success','text-info','text-warning','text-danger','text-light','text-dark','text-body','text-muted','text-black-50','text-white-50','text-hide','visible','invisible']

test('E2E', t => {
  readFile('fixtures/css/bootstrap.min.css', 'utf-8', (err, file) => {
    const parsed = parseCss(file)
    const diff = difference(parsed, expectedParsed)
    t.is(diff, 0)
  })
})
