import React, { useState } from 'react'
import { Resource, ResourceType } from '../utils/types'
import resources from '../utils/resources'
import bookIcon from '../images/book.svg'
import websiteIcon from '../images/laptop.svg'
import videoIcon from '../images/film.svg'

const Resources: React.FC = () => {
  const [filterTags, setFilterTags] = useState<Array<string>>([])
  const [filterFormats, setFilterFormats] = useState<Array<string>>([])
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const sortedResources = resources.sort((a, b) => a.title.localeCompare(b.title))

  const getTagList = (resources: Array<Resource>) => {
    let tagList: Array<string> = []
    resources.forEach(r => {
      r.tags.forEach(t => {
        if (!tagList.includes(t)) {
          tagList = tagList.concat(t)
        }
      })
    })
    return tagList
  }

  const displayTagSelector = () => {
    const tags = getTagList(sortedResources)

    const styleTagButton = (tag: string): string => {
      if (filterTags.includes(tag)) {
        return ' is-primary'
      } else {
        return ''
      }
    }

    return (
      <div className='buttons'>
        {tags.map(tag => <button
          className={ 'button' + styleTagButton(tag) }
          key={tag}
          onClick={() => filterTags.includes(tag) ? setFilterTags(filterTags.filter(t => t !== tag)) : setFilterTags(filterTags.concat(tag))}
        >{tag}</button>)}
      </div>
    )
  }

  const displayFormatSelector = () => {
    const styleFormatButton = (format: string): string => {
      if (filterFormats.includes(format)) {
        return ' is-primary'
      } else {
        return ''
      }
    }

    return (
      <div className='buttons'>
        <button
          className={ 'button' + styleFormatButton(ResourceType.Website) }
          onClick={() => filterFormats.includes(ResourceType.Website) ? setFilterFormats(filterFormats.filter(f => f !== ResourceType.Website)) : setFilterFormats(filterFormats.concat(ResourceType.Website))}
        >
          Webpage
        </button>
        <button
          className={ 'button' + styleFormatButton(ResourceType.Book) }
          onClick={() => filterFormats.includes(ResourceType.Book) ? setFilterFormats(filterFormats.filter(f => f !== ResourceType.Book)) : setFilterFormats(filterFormats.concat(ResourceType.Book))}
        >
          Book
        </button>
        <button
          className={ 'button' + styleFormatButton(ResourceType.Video) }
          onClick={() => filterFormats.includes(ResourceType.Video) ? setFilterFormats(filterFormats.filter(f => f !== ResourceType.Video)) : setFilterFormats(filterFormats.concat(ResourceType.Video))}
        >
          Video
        </button>
      </div>
    )
  }

  const filterResources = (resourceList: Array<Resource>) => {
    if (filterTags.length === 0 && filterFormats.length === 0) {
      return resourceList
    } else if (filterTags.length === 0 && filterFormats.length !== 0) {
      return resourceList.filter(r => filterFormats.includes(r.type))
    } else if (filterTags.length !== 0 && filterFormats.length === 0) {
      return resourceList.filter(r => r.tags.some(tag => filterTags.includes(tag)))
    } else {
      const filterByTag = resourceList.filter(r => r.tags.some(tag => filterTags.includes(tag)))
      return filterByTag.filter(r => filterFormats.includes(r.type))
    }
  }

  const displayFilterBox = () => {
    if (showFilters) {
      return (
        <div className='box has-text-black'>
          <div className='buttons'>
            <button
              className='button'
              onClick={() => setShowFilters(false)}
            >
              Hide Filters
            </button>
            <button
              className='button'
              onClick = {() => {
                setFilterFormats([])
                setFilterTags([])
              }}
            >
              Clear Filters
            </button>
          </div>
          <h4>Format:</h4>
          {displayFormatSelector()}
          <h4>Category:</h4>
          {displayTagSelector()}
        </div>
      )
    } else {
      return (
        <div className='box'>
          <div className='buttons'>
            <button
              className='button'
              onClick={() => setShowFilters(true)}
            >
              Show Filters
            </button>
            <button
              className='button'
              onClick = {() => {
                setFilterFormats([])
                setFilterTags([])
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )
    }
  }

  const displayResources = (item: Resource) => {
    const displayIcon = (type: ResourceType): React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> | null => {
      switch (type) {
      case (ResourceType.Website):
        return <img src={websiteIcon} alt='' />
      case (ResourceType.Book):
        return <img src={bookIcon} alt='' />
      case (ResourceType.Video):
        return <img src={videoIcon} alt='' />
      default:
        return null
      }
    }

    return (
      <div className='box resource-box' key={item.url}>
        <a href={item.url}>
          <div className='media has-text-black'>
            <figure className='media-left'>
              <p className='image is-64x64'>
                {displayIcon(item.type)}
              </p>
            </figure>
            <div className='media-content'>
              <div className='content'>
                <p>
                  <strong className='has-text-primary'>{item.title}</strong> by <span className='has-text-secondary'>{item.author}</span>
                  <br />
                  {item.description}
                  <br />
                  <span className='has-text-grey is-hidden-mobile'>{item.url}</span>
                  <br className='is-hidden-mobile' />
                  Tags: {item.tags.map(t => <span className='resource-tag' key={t}>{t}</span>)}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  }

  const handleFilterResults = (resourceList: Array<Resource>) => {
    const resourcesToShow = filterResources(resourceList)
    if (resourcesToShow.length > 0) {
      return resourcesToShow.map(item => displayResources(item))
    } else {
      return (
        <div className='box has-text-black'>
          <p>No resources matched your filters.</p>
        </div>
      )
    }
  }

  return (
    <div>
      <div className='hero mb-4'>
        <div className='hero-body has-text-centered'>
          <h1 className='title'>Resources</h1>
        </div>
      </div>
      <div className='container' style={{ maxWidth: '1000px' }}>
        {displayFilterBox()}        
        {handleFilterResults(sortedResources)}
      </div>
    </div>
  )
}

export default Resources