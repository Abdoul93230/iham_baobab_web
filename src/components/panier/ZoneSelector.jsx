import React, { useState, useEffect, useRef } from 'react'
import { Search, ChevronDown, MapPin, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

const ZoneSelector = ({
  placeholder = "Sélectionner une zone...",
  selectedZone = null,
  onSelect,
  excludeZoneIds = [],
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [zones, setZones] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const dropdownRef = useRef(null)
  
  const BackendUrl = process.env.REACT_APP_Backend_Url;

  // Fonction de recherche de zones
  const searchZones = async (query) => {
    if (query.length < 2) {
      setZones([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`${BackendUrl}/api/shipping2/zones/search?q=${encodeURIComponent(query)}&limit=20`)
      const data = await response.json()
      
      if (data.success) {
        const filteredZones = data.data.filter(zone => 
          !excludeZoneIds.includes(zone._id)
        )
        setZones(filteredZones)
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de zones:', error)
      setZones([])
    } finally {
      setIsSearching(false)
    }
  }

  // Debounce pour la recherche
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchZones(searchTerm)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (zone) => {
    onSelect?.(zone)
    setIsOpen(false)
    setSearchTerm('')
  }

  const getZoneIcon = (type) => {
    const icons = {
      country: '🌍',
      region: '🏛️',
      city: '🏙️',
      district: '🏘️'
    }
    return icons[type] || '📍'
  }

  const getZoneTypeLabel = (type) => {
    const labels = {
      country: 'Pays',
      region: 'Région',
      city: 'Ville', 
      district: 'Quartier'
    }
    return labels[type] || type
  }

  const displayValue = selectedZone ? (selectedZone.fullPath || selectedZone.name) : ''

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <span className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          {selectedZone ? (
            <span className="truncate">{displayValue}</span>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#30A08B] focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-60 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin h-5 w-5 border-2 border-[#30A08B] border-t-transparent rounded-full mx-auto"></div>
                <span className="mt-2 block">Recherche en cours...</span>
              </div>
            ) : zones.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchTerm.length < 2 ? (
                  "Tapez au moins 2 caractères pour rechercher"
                ) : (
                  "Aucune zone trouvée"
                )}
              </div>
            ) : (
              zones.map((zone) => (
                <button
                  key={zone._id}
                  type="button"
                  onClick={() => handleSelect(zone)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <span className="text-lg">{getZoneIcon(zone.type)}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">
                        {zone.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {zone.fullPath}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {getZoneTypeLabel(zone.type)}
                    </span>
                    {selectedZone?._id === zone._id && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ZoneSelector