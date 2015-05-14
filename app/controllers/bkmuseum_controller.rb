class BkmuseumController < ApplicationController

  def search
    search_term = params[:keyword]
    url = "http://www.brooklynmuseum.org/opencollection/api/?method=collection.search&version=1&api_key=#{ENV['bk_museum']}&format=json&item_type=object&require_image=true&max_image_size=768&max_thumb_size=192&keyword=#{search_term}"
    @response = HTTParty.get(url)
    render json: @response
  end

  def lookup
    object_id = params[:objectID]
    url = "http://www.brooklynmuseum.org/opencollection/api/?method=collection.getItem&version=1&api_key=#{ENV['bk_museum']}&format=json&max_image_size=768&item_type=object&item_id=#{object_id}"
    @response = HTTParty.get(url)
    render json: @response
  end

end