class AddZIndexToArtworks < ActiveRecord::Migration
  def change
    add_column :artworks, :zIndex, :integer
  end
end
