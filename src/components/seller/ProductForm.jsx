import { useState } from 'react'
import Button from '../ui/Button.jsx'

const fieldClass =
  'w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primarysoft'

const EMPTY_PRODUCT = { name: '', price: '', stock: '', category_id: '', image: '', description: '' }

export default function ProductForm({ initialValues, categories = [], submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...EMPTY_PRODUCT, ...initialValues })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(field) {
    return (event) => setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await onSubmit({
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
        category_id: Number(values.category_id),
      })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-semibold" htmlFor="name">
          Nama produk
        </label>
        <input id="name" className={fieldClass} value={values.name} onChange={handleChange('name')} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="price">
          Harga (Rp)
        </label>
        <input
          id="price"
          type="number"
          min="0"
          step="500"
          className={fieldClass}
          value={values.price}
          onChange={handleChange('price')}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="stock">
          Stok
        </label>
        <input
          id="stock"
          type="number"
          min="0"
          step="1"
          className={fieldClass}
          value={values.stock}
          onChange={handleChange('stock')}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="category_id">
          Kategori
        </label>
        <select
          id="category_id"
          className={fieldClass}
          value={values.category_id}
          onChange={handleChange('category_id')}
          required
        >
          <option value="">Pilih kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="image">
          Gambar (opsional)
        </label>
        <input
          id="image"
          className={fieldClass}
          value={values.image}
          onChange={handleChange('image')}
          placeholder="/assets/images/omega-egg.png atau https://…"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-semibold" htmlFor="description">
          Deskripsi
        </label>
        <textarea
          id="description"
          rows={3}
          className={fieldClass}
          value={values.description}
          onChange={handleChange('description')}
          required
        />
      </div>

      {error && <p className="text-sm font-semibold text-red-600 sm:col-span-2">{error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan…' : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Batal
          </Button>
        )}
      </div>
    </form>
  )
}
