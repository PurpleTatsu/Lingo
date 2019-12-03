class CreateVehicles < ActiveRecord::Migration[6.0]
  def change
    create_table :vehicles do |t|
      t.string :title
      t.text :image
      t.string :language
      t.string :genre

      t.timestamps
    end
  end
end
