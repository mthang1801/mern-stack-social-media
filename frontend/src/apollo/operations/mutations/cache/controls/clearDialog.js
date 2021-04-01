import {Dialog} from "../../../../models/cache/Dialog"

const clearDialog = setDialogVar => () => setDialogVar({...Dialog})

export default clearDialog;