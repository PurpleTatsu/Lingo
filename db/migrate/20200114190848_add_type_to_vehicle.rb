class AddTypeToVehicle < ActiveRecord::Migration[6.0]
  def change
    add_column :vehicles, :category, :string
  end
end
