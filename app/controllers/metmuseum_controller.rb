class MetmuseumController < ApplicationController

  def search
    search_term = params[:keyword]
    url = "http://scrapi.org/search/#{search_term}"
    @response = HTTParty.get(url)
    render json: @response
  end

  def lookup
    object_id = params[:objectID]
    url = "http://scrapi.org/object/#{object_id}"
    @response = HTTParty.get(url)
    render json: @response
  end

end