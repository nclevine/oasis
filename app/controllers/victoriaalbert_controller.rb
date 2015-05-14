class VictoriaalbertController < ApplicationController

  def search
    search_term = params[:keyword]
    url = "http://www.vam.ac.uk/api/json/museumobject/search?images=1&q=#{search_term}"
    @response = HTTParty.get(url)
    render json: @response
  end

  def lookup
    object_id = params[:objectID]
    url = "http://www.vam.ac.uk/api/json/museumobject/#{object_id}"
    @response = HTTParty.get(url)
    render json: @response
  end

end