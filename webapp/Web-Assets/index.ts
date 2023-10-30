import { TabelaPadraoType } from "./tabelaPadrao/config.controller"
import { TileNumericoType } from "./tiles/TileNumerico/config.controller"
import { TileTresValoresType } from "./tiles/TileTresValores/config.controller"
import { TilePrincipalType } from "./tiles/TilePrincipal/config.controller"
import { TileTimestampType } from "./tiles/TileTimestamp/config.controller"
import { CadastroType } from "./modulos/Cadastros/config.controller"
import { FormDinamicoType } from "./FormDinamico/config.controller"
import { TileStatusType } from "./tiles/TileStatus/config.controller"
import { TileProgressoType } from "./tiles/TileProgresso/config.controller"

export type Assets = {
    tabelaPadrao: TabelaPadraoType
    FormDinamico: FormDinamicoType
    "tiles.TileNumerico": TileNumericoType
    "tiles.TileTresValores": TileTresValoresType
    "tiles.TilePrincipal": TilePrincipalType
    "tiles.TileTimestamp": TileTimestampType
    "tiles.TileStatus": TileStatusType
    "tiles.TileProgresso": TileProgressoType
    "modulos.Cadastros": CadastroType
}