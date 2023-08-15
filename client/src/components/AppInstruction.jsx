import React, {useState} from 'react';
import allergyDemo from '../../dist/assets/allergy-demo.gif';
import ayceDemo from '../../dist/assets/ayce-demo.gif';
import iconDemo from '../../dist/assets/icons-demo.gif';
import searchDemo from '../../dist/assets/search-demo.gif';
import favoritesDemo from '../../dist/assets/favorites-demo.gif';
import ratingDemo from '../../dist/assets/rating-demo.gif';
import detailsDemo from '../../dist/assets/details-demo.gif';

export default function AppInstruction ({closeModal}) {

  const [currentPage, setCurrentPage] = useState(0);

  const pageInputs = [
    {
      header: 'Instructions',
      direction: 'We kindly request your thorough review of the instructions, as they offer essential insights to facilitate your effective utilization of the application. Your attention to these details will greatly enhance your experience with the app.'
    },
    {
      header: 'Allergies',
      direction: 'The Allergies feature enables users to specify their specific allergens, facilitating a tailored experience. Once preferences are set, the system will provide a curated selection of items accompanied by informative icons. This functionality streamlines the ordering process, enhancing user convenience. For individuals without allergies, this feature remains optional and can be disregarded.',
      demo: allergyDemo,
    },
    {
      header: 'AYCE?',
      direction: `Users are provided with the opportunity to opt for either AYCE (All You Can Eat) or A LA CARTE dining options. Upon your selection, the system enhances list presentation to align with your chosen preference, placing your chosen menu items before the remaining alternatives. This approach ensures that the options you did not select remain accessible, appearing subsequently in the list.`,
      demo: ayceDemo,
    },
    {
      header: 'Icons',
      direction: `To fully understand what each icon means, just click on the "Info" icon (it looks like a question mark). When you click it, you'll see an explanation for each icon, which will help you better understand what they represent.`,
      demo: iconDemo,
    },
    {
      header: 'Search',
      direction: `Utilize the search functionality to locate the desired menu item. This feature will also generate a display of relevant keywords and ingredients included within the recipe.`,
      demo: searchDemo,
    },
    {
      header: 'Favorites',
      direction: `For those who prefer to record their preferences for future visits, this feature caters to your needs. You have the option to bookmark menus as favorites, and they can be conveniently accessed by selecting the "My Favorites" button.`,
      demo: favoritesDemo,
    },
    {
      header: 'Ratings',
      direction: `For individuals who value the input of fellow customers and make selections based on ratings and recommendations, this feature is tailored to your preferences. You have the capability to view ratings provided by other customers similar to yourself, aiding in your decision-making process. Additionally, you have the opportunity to contribute your own ratings to further enrich the user experience.`,
      demo: ratingDemo,
    },
    {
      header: 'Details',
      direction: `Within the details page, a range of comprehensive features awaits your exploration. Here, you can thoroughly review menu specifics, including images and content composition. It's important to note that certain elements may be discreetly concealed to ensure the safeguarding of our proprietary recipes, while non-essential details are intentionally omitted. Furthermore, you have the option to actively contribute images to enhance the user experience. Additionally, our intuitive guidance walks you through a streamlined ordering process, complete with instructions for excluding allergenic ingredients. This guidance extends to providing a visual representation of your chosen menu after the exclusion of such elements.`,
      demo: detailsDemo,
    }
  ]

  const handleClose = () => {
    localStorage.setItem('appInstruction', true);
    closeModal();
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header instruction-header'>
          {pageInputs[currentPage].header}
        </div>
        <div className='modal-body'>
          <div className='gif-container'>
            <img src={pageInputs[currentPage].demo}/>
          </div>
          {pageInputs[currentPage].direction}
        </div>
        <div className='modal-footer instruction-footer'>
          {(currentPage > 0) && <span className='button-like-span' onClick={() => setCurrentPage(x => x - 1)}>{'< '}Prev</span>}
          {(currentPage < pageInputs.length - 1) ? <span className='button-like-span instruction-next-button' onClick={() => setCurrentPage(x => x + 1)}>{`${currentPage + 1}/${pageInputs.length} `}Next{' >'}</span> : <span className='button-like-span instruction-close-button' onClick={handleClose}>{`${pageInputs.length}/${pageInputs.length} `}Close</span>}
        </div>
      </div>
    </div>
  )
}