

function EnterMovie  () {

    return (
        <div className="LopCha">
    <div class="py-12">
          <h2 class="text-2xl font-bold">Create movie</h2>
          <p class="mt-2 text-lg text-gray-600">Example.</p>
          <div class="mt-8 max-w-md">
            <div class="grid grid-cols-1 gap-6">
              <label class="block">
                <span class="text-gray-700">Movie name</span>
                <input type="text" class="mt-1 block w-full" placeholder=""/>
              </label>
             
              <label class="block">
                <span class="text-gray-700">Date of Release</span>
                <input type="text" class="mt-1 block w-full" />
              </label>
              
    
              <div class="block">
                <div class="mt-2">
                  <div>
                    <label class="inline-flex items-center">
                     <button type="button" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                     Save
                    </button>
                    
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
   
    
);
}

export default EnterMovie;