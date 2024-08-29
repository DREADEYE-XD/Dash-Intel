import React from 'react'

export const MenuArrow = ({isExpanded, theme}) => {
  return (
    <button className="flex items-center justify-center gap-1">
              {/* Expand the tabs using useState */}
              {isExpanded ? (
                // to manage the orientation of the arrows when the tab expands or collapses
                <img
                  src={
                    theme
                      ? "./assets/icons/arrow-down(white).png"
                      : "./assets/icons/arrow-down.png"
                  }
                  alt={
                    theme
                      ? "./assets/icons/arrow-down(white).png"
                      : "./assets/icons/arrow-down.png"
                  }
                  height="16"
                  width="16"
                />
              ) : (
                <img
                  src={
                    theme
                      ? "./assets/icons/arrow-right(white).png"
                      : "./assets/icons/arrow-right.png"
                  }
                  alt={
                    theme
                      ? "./assets/icons/arrow-right(white).png"
                      : "./assets/icons/arrow-right.png"
                  }
                  height="16"
                  width="16"
                />
              )}

              <span className="text-lg font-semibold">Games</span>
            </button>
  )
}
