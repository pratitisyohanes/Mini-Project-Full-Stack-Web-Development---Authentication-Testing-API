import { asset } from '../utils/asset.js'

const WORKBOOK_URL = asset('/data/elefez-marketplace.xlsx')
const STORAGE_PREFIX = 'elefez_sheet_'

export const SHEETS = ['users', 'product_categories', 'products', 'transactions']

let workbookPromise = null

function loadWorkbook() {
  workbookPromise ??= Promise.all([import('xlsx'), fetch(WORKBOOK_URL)])
    .then(async ([XLSX, response]) => {
      if (!response.ok) {
        throw new Error(`Gagal membaca file Excel (status ${response.status}).`)
      }
      return { XLSX, workbook: XLSX.read(await response.arrayBuffer()) }
    })
    .catch((error) => {
      workbookPromise = null
      throw error
    })

  return workbookPromise
}

function readSaved(sheet) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + sheet)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function getTable(sheet) {
  const saved = readSaved(sheet)
  if (saved) return saved

  const { XLSX, workbook } = await loadWorkbook()
  const worksheet = workbook.Sheets[sheet]
  if (!worksheet) throw new Error(`Sheet "${sheet}" tidak ditemukan di file Excel.`)

  return XLSX.utils.sheet_to_json(worksheet)
}

export function saveTable(sheet, rows) {
  localStorage.setItem(STORAGE_PREFIX + sheet, JSON.stringify(rows))
  return rows
}

export function resetTables() {
  SHEETS.forEach((sheet) => localStorage.removeItem(STORAGE_PREFIX + sheet))
}

export async function exportWorkbook(filename = 'elefez-marketplace.xlsx') {
  const { XLSX } = await loadWorkbook()
  const workbook = XLSX.utils.book_new()

  for (const sheet of SHEETS) {
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(await getTable(sheet)), sheet)
  }

  XLSX.writeFile(workbook, filename)
}

export function nextId(rows) {
  return rows.reduce((max, row) => Math.max(max, Number(row.id) || 0), 0) + 1
}
