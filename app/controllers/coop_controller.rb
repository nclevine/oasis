class CoopController < ApplicationController

  def search
    search_term = params[:keyword]
    url = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=#{ENV['cooper_hewitt']}&has_images=1&page=1&per_page=100&query=#{search_term}"
    @response = HTTParty.get(url)
    render json: @response
  end

  def lookup
    object_id = params[:objectID]
    url = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=#{ENV['cooper_hewitt']}&object_id=#{object_id}"
    @response = HTTParty.get(url)
    render json: @response
  end

end