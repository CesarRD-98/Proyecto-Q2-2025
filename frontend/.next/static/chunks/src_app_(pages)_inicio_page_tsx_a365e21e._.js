(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(pages)/inicio/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/components/TicketTable.tsx
__turbopack_context__.s({
    "default": (()=>TicketTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$material$2d$react$2d$table$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/material-react-table/dist/index.esm.js [app-client] (ecmascript)");
"use client";
;
;
// Datos de ejemplo
const data = [
    {
        id: 1001,
        titulo: "Error en login",
        estado: "Abierto",
        prioridad: "Alta",
        fecha: "2025-06-01"
    },
    {
        id: 1002,
        titulo: "No carga perfil",
        estado: "Cerrado",
        prioridad: "Media",
        fecha: "2025-05-30"
    },
    {
        id: 1003,
        titulo: "Nueva funcionalidad",
        estado: "Pendiente",
        prioridad: "Baja",
        fecha: "2025-05-28"
    }
];
// Columnas definidas para MRT
const columns = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "titulo",
        header: "Título"
    },
    {
        accessorKey: "estado",
        header: "Estado"
    },
    {
        accessorKey: "prioridad",
        header: "Prioridad"
    },
    {
        accessorKey: "fecha",
        header: "Fecha"
    }
];
function TicketTable() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$material$2d$react$2d$table$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MaterialReactTable"], {
        columns: columns,
        data: data
    }, void 0, false, {
        fileName: "[project]/src/app/(pages)/inicio/page.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
_c = TicketTable;
var _c;
__turbopack_context__.k.register(_c, "TicketTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_%28pages%29_inicio_page_tsx_a365e21e._.js.map